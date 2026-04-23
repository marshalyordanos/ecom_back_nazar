"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeRichTextHtml = sanitizeRichTextHtml;
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const RICH_TEXT_OPTIONS = {
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
        a: sanitize_html_1.default.simpleTransform("a", { rel: "noopener noreferrer nofollow", target: "_blank" }),
    },
};
function sanitizeRichTextHtml(input) {
    return (0, sanitize_html_1.default)(input, RICH_TEXT_OPTIONS);
}
//# sourceMappingURL=sanitizeHtml.js.map