import sanitizeHtml from "sanitize-html";

const RICH_TEXT_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "h1", "h2", "h3", "h4", "h5", "h6",
    "p", "blockquote", "pre", "code",
    "ul", "ol", "li",
    "strong", "em", "u", "s", "sub", "sup",
    "a", "br", "hr", "span", "div",
    "table", "thead", "tbody", "tr", "th", "td",
    "img",
  ],
  allowedAttributes: {
    a: ["href", "name", "target", "rel"],
    img: ["src", "alt", "title", "width", "height"],
    span: ["style"],
    div: ["style"],
    "*": ["class"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesAppliedToAttributes: ["href", "src"],
  allowProtocolRelative: false,
  allowedStyles: {
    "*": {
      "text-align": [/^(left|right|center|justify)$/],
      "font-weight": [/^(normal|bold|\d{3})$/],
      "font-style": [/^(normal|italic)$/],
    },
  },
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer nofollow", target: "_blank" }),
  },
};

export function sanitizeRichTextHtml(input: string): string {
  return sanitizeHtml(input, RICH_TEXT_OPTIONS);
}
