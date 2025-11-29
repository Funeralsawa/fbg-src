import { useState, useEffect, useRef } from 'react';
import site from 'fbg-generated';
import { useLocation, useNavigate } from 'react-router-dom';

function format(date) {
    const d = date.split("T");
    const first = d[0];
    const second = d[1].split(".")[0];
    return `${first} ${second}`;
}

function PaperBanner() {
    const location = useLocation();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [publishedAt, setPublishedAt] = useState("");
    const [lastChangeTime, setLastChangeTime] = useState("");
    const [fontNum, setFontNum] = useState(0);
    const [fontTags, setFontTags] = useState([]);

    const paperBannerRef = useRef(null);

    const getPaperInfo = () => {
        const post = site.posts.find(p => `/posts/${p.slug}` === location.pathname);

        if (!post) {
            navigate("/404", { replace: true });
            return;
        }

        const title = post.title.replace(/\.md$/, '');
        setName(title);
        setPublishedAt(format(post.createdDate));
        setLastChangeTime(post.lastModifyDate);
        setFontNum(post.fontNum);
        setFontTags(post.tags);
    };

    useEffect(() => {
        getPaperInfo();
    }, [location.pathname]); // 路径发生改变就重新执行

    useEffect(() => {
        const nav = document.getElementsByClassName("navbar")[0];
        paperBannerRef.current.style.marginTop = `${nav.offsetHeight}px`;
    }, [window.innerWidth < 768]);

    return (
        <div className="paper-banner" ref={paperBannerRef}>
            <div className="paper-banner-content">
                <h1 align='center'>{name}</h1>
                <div className="paper-info">
                    <div className="paper-info-left">
                        <p className='paper-banner-content-font'>
                            <i className="bi bi-calendar" />
                            &nbsp;
                            发表时间：{publishedAt}
                        </p>
                        <p className='paper-banner-content-font'>
                            <i className="bi bi-clock" />
                            &nbsp;
                            最后更新时间：{lastChangeTime}
                        </p>
                    </div>
                    <div className='paper-info-right'>
                        <p className='paper-banner-content-font'>
                            <i className="bi bi-file-earmark-font" />
                            &nbsp;
                            总字数：{fontNum}
                        </p>
                        <p className='paper-banner-content-font font-tags'>
                            <i className="bi bi-tags" />
                            &nbsp;
                            标签：{fontTags.join(", ")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaperBanner;
