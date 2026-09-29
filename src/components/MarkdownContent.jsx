import React from 'react';

/**
 * Dependency-free Markdown renderer for Gemini-generated answers.
 *
 * Supports:
 *  - Headings (# .. ######)
 *  - Unordered (-, *) and ordered (1., 1)) lists
 *  - Horizontal rules (---, ***, ___)
 *  - Blockquotes (>)
 *  - Paragraphs with collapsed whitespace (standard Markdown)
 *  - Inline: **bold**, __bold__, *italic*, _italic_, `code`,
 *    [text](url) links
 *  - [Source N] and [Source 1, Source 2] citation markers rendered as
 *    clickable chips that jump to the corresponding source card
 *
 * Builds React elements directly (no dangerouslySetInnerHTML), so the
 * rendered output is XSS-safe. No external Markdown library required.
 */

const INLINE_PATTERN =
  '(\\*\\*[^*]+\\*\\*|__[^_]+__|\\*[^*\\n]+\\*|_[^_\\n]+_|`[^`\\n]+`|\\[[^\\]\\n]+\\]\\([^)\\s]+\\)|\\[Source[^\\]\\n]*\\])';

function renderCitation(n, ctx, key) {
  const { onCitationClick, sourceCount } = ctx;
  const exists = sourceCount > 0 && n >= 1 && n <= sourceCount;

  if (!exists) {
    return (
      <span key={key} className="text-[#5F5F5F]">
        [Source {n}]
      </span>
    );
  }

  return (
    <button
      key={key}
      type="button"
      title={`Jump to Source ${n}`}
      aria-label={`Jump to Source ${n}`}
      onClick={() => onCitationClick && onCitationClick(n)}
      className="inline-flex items-baseline align-baseline mx-0.5 px-1.5 py-px rounded-md bg-[#EAF3EC] border border-[#C8E0CE] text-[10px] font-black text-[#1F5C3D] leading-4 hover:bg-[#1F5C3D] hover:text-white hover:border-[#1F5C3D] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5C3D]/40"
    >
      [{n}]
    </button>
  );
}

function renderCitationGroup(token, ctx, key) {
  const inner = token.slice(1, -1);
  const nums = inner
    .split(',')
    .map((s) => s.trim())
    .map((s) => (s.match(/(\d+)/) || [])[1])
    .filter(Boolean)
    .map(Number);

  if (!nums.length) {
    return token;
  }

  return (
    <React.Fragment key={key}>
      {nums.map((n) => renderCitation(n, ctx, `${key}-${n}`))}
    </React.Fragment>
  );
}

function renderInline(text, ctx, keyPrefix) {
  const parts = [];
  const regex = new RegExp(INLINE_PATTERN, 'g');
  let lastIndex = 0;
  let match;
  let idx = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    const key = `${keyPrefix}-${idx++}`;

    if (/^\*\*[\s\S]+\*\*$/.test(token) || /^__[\s\S]+__$/.test(token)) {
      parts.push(
        <strong key={key} className="font-bold text-[#1F5C3D]">
          {renderInline(token.slice(2, -2), ctx, key)}
        </strong>
      );
    } else if (/^\*[^*]+\*$/.test(token) || /^_[^_]+_$/.test(token)) {
      parts.push(<em key={key}>{renderInline(token.slice(1, -1), ctx, key)}</em>);
    } else if (/^`[^`]+`$/.test(token)) {
      parts.push(
        <code
          key={key}
          className="px-1 py-0.5 bg-[#F3EDE0] border border-[#E0D8C8] rounded text-[0.85em] font-mono text-[#8A5A00]"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      if (linkMatch) {
        parts.push(
          <a
            key={key}
            href={linkMatch[2]}
            target="_blank"
            rel="noreferrer"
            className="text-[#1F5C3D] font-semibold underline hover:text-[#16452D]"
          >
            {linkMatch[1]}
          </a>
        );
      } else if (/^\[Source[^\]]*\]$/i.test(token)) {
        parts.push(renderCitationGroup(token, ctx, key));
      } else {
        parts.push(token);
      }
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export default function MarkdownContent({
  content = '',
  onCitationClick,
  sourceCount = 0,
  className = ''
}) {
  const ctx = { onCitationClick, sourceCount };
  const lines = String(content).replace(/\r\n/g, '\n').split('\n');

  const blocks = [];
  const paraBuf = [];
  let key = 0;
  let i = 0;

  const flushParagraph = () => {
    if (paraBuf.length) {
      const k = key++;
      blocks.push(
        <p key={`p-${k}`} className="leading-relaxed">
          {renderInline(paraBuf.join(' '), ctx, `p${k}`)}
        </p>
      );
      paraBuf.length = 0;
    }
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Blank line → paragraph break
    if (!trimmed) {
      flushParagraph();
      i++;
      continue;
    }

    // Headings
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      const level = headingMatch[1].length;
      const text = headingMatch[2].replace(/\s*#+\s*$/, '');
      const k = key++;
      const cls =
        level <= 2
          ? 'text-base font-extrabold text-[#1F5C3D] mt-4 first:mt-0'
          : level === 3
            ? 'text-sm font-extrabold text-[#1F5C3D] mt-4 first:mt-0'
            : 'text-sm font-bold text-[#2B2B2B] mt-3 first:mt-0';
      const Tag = `h${Math.min(level + 2, 6)}`;
      blocks.push(
        <Tag key={`h-${k}`} className={cls}>
          {renderInline(text, ctx, `h${k}`)}
        </Tag>
      );
      i++;
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      flushParagraph();
      blocks.push(<hr key={`hr-${key++}`} className="border-[#E0D8C8] my-4" />);
      i++;
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(trimmed)) {
      flushParagraph();
      const quoteLines = [];
      while (i < lines.length && /^>\s?/.test(lines[i].trim())) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      const k = key++;
      blocks.push(
        <blockquote
          key={`bq-${k}`}
          className="border-l-4 border-[#8FBC94] bg-[#FAF7F0] px-4 py-2 rounded-r-xl text-[#5F5F5F] italic leading-relaxed"
        >
          {renderInline(quoteLines.join(' '), ctx, `bq${k}`)}
        </blockquote>
      );
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph();
      const items = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''));
        i++;
      }
      const k = key++;
      blocks.push(
        <ul key={`ul-${k}`} className="list-disc pl-5 space-y-1.5">
          {items.map((it, j) => (
            <li key={j} className="leading-relaxed">
              {renderInline(it, ctx, `ul${k}-${j}`)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+[.)]\s+/.test(trimmed)) {
      flushParagraph();
      const items = [];
      while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) {
        items.push(lines[i].trim().replace(/^\d+[.)]\s+/, ''));
        i++;
      }
      const k = key++;
      blocks.push(
        <ol key={`ol-${k}`} className="list-decimal pl-5 space-y-1.5">
          {items.map((it, j) => (
            <li key={j} className="leading-relaxed">
              {renderInline(it, ctx, `ol${k}-${j}`)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Regular paragraph line (joined with spaces per Markdown rules)
    paraBuf.push(trimmed);
    i++;
  }

  flushParagraph();

  return (
    <div className={`space-y-3 text-sm lg:text-base text-[#2B2B2B] ${className}`}>
      {blocks}
    </div>
  );
}