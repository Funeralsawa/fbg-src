import React from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import "github-markdown-css/github-markdown.css";
import { useParams, useNavigate } from 'react-router-dom';
import site from 'fbg-generated';
import { setToc, setID } from "../redux/action.js";
import { connect } from "react-redux";
import pinyin from "pinyin";
import { useState, useEffect } from "react";

// 高亮
marked.setOptions({
	highlight: (code, lang) => {
		if (lang && hljs.getLanguage(lang)) return hljs.highlight(code, { language: lang }).value;
		return hljs.highlightAuto(code).value;
	}
});

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

function BlogApp({setToc, setID}) {
	const { name } = useParams();
	const [toc, setTOCState] = useState([]);
	const [htmlContent, setHtmlContent] = useState("");

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
		if (!post) useNavigate("/404");

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

	return (
		<article
			className="markdown-body"
			style={{ flex: 1, overflowWrap: "break-word" }}
			dangerouslySetInnerHTML={{ __html: htmlContent }}
		/>
	);
}

export default connect(null, { setToc, setID })(BlogApp);
