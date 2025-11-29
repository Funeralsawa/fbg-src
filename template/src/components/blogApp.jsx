import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/vs.css";
import "github-markdown-css/github-markdown.css";
import { useParams, useNavigate } from 'react-router-dom';
import site from 'fbg-generated';
import { setToc, setID } from "../redux/action.js";
import { connect } from "react-redux";
import pinyin from "pinyin";
import { useState, useEffect, useRef } from "react";
import ImageViewer from "./imageViewer.jsx";

function slugify(text) {
	if (!text) return "";
	if (/[\u4e00-\u9fa5]/.test(text)) {
		text = pinyin(text, { style: pinyin.STYLE_NORMAL }).flat().join("-");
	}
	return text
		.toLowerCase()
		.trim()
		.replace(/[\s]+/g, "-")
		.replace(/[^\w\-]+/g, "")
		.replace(/\-\-+/g, "-")
		.replace(/^-+/, "")
		.replace(/-+$/, "");
}

// marked 配置（只初始化一次）
const renderer = new marked.Renderer();
renderer.code = (code, infostring, escaped) => {
    // 如果 code 不是字符串，尝试提取字符串
    if (typeof code !== 'string') {
        if (code?.text) {
            code = code.text; // 某些插件会把 code 包装成对象 { text: '...' }
        } else {
            code = ''; // 保底
        }
    }

    const lang = (infostring || '').match(/\S*/)[0];

    const highlighted = (lang && hljs.getLanguage(lang))
        ? hljs.highlight(code, { language: lang }).value
        : hljs.highlightAuto(code).value;

    return `<pre><code class="hljs ${lang || ''}">${highlighted}</code></pre>`;
};

renderer.heading = (token) => {
	const id = slugify(token.text);
	return `<h${token.depth} id="${id}">${token.text}</h${token.depth}>`;
};

marked.setOptions({
	renderer,
	gfm: true,
    breaks: true,
});

function BlogApp({setToc, setID}) {
	const contentRef = useRef(null);

	const { name } = useParams();
	const [toc, setTOCState] = useState([]);
	const [htmlContent, setHtmlContent] = useState("");
	const [viewer, setViewer] = useState(null);

	const navigate = useNavigate();

	const generateTOC = (mdText) => {
		const tokens = marked.lexer(mdText);
		return tokens
			.filter((t) => t.type === "heading" && t.depth <= 3)
			.map((t) => ({
				text: t.text,
				id: slugify(t.text),
				depth: t.depth
			}));
	};

	useEffect(() => {
		const post = (site.posts || []).find(p => p.slug === name);
		
		if (!post) {
			navigate("/404", { replace: true });
			return;
		}

		const newTOC = generateTOC(post.content || '');
		const htmlc = marked.parse(post.content || '');
		setHtmlContent(htmlc);
		setToc(newTOC);
		setTOCState(newTOC)
	}, [name]);

	
	// 滚动高亮目录
	useEffect(() => {
		const handleScroll = () => {
			for (const h of toc) {
				const el = document.getElementById(h.id);
				if (el && el.getBoundingClientRect().top >= -10) {
					setID(h.id);
					return;
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [toc]);

	useEffect(() => {
        const container = document.getElementById("markdown-body");
		if (!container) return;

		const imgs = container.querySelectorAll("img");

		const sources = [...imgs].map(img => img.src);

		imgs.forEach((img, idx) => {
			img.style.cursor = "zoom-in";
			img.draggable = false;
			img.onclick = () => setViewer({ images: sources, index: idx });
		});
    }, [viewer, htmlContent]);

	return (
		<>
			<article
				ref={contentRef}
				id="markdown-body"
				className="markdown-body"
				style={{ flex: 1, overflowWrap: "break-word" }}
				dangerouslySetInnerHTML={{ __html: htmlContent }}
			/>

			{viewer && (
				<ImageViewer
					images={viewer.images}
					index={viewer.index}
					onClose={() => setViewer(null)}
				/>
			)}
		</>
	);
}

export default connect(null, { setToc, setID })(BlogApp);
