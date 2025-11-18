import React, { Component } from 'react';
import site from "fbg-generated";
import { useParams, useLocation, useNavigate } from 'react-router-dom';

class PaperBanner extends Component {
    state = {
        name: "",
        publishedAt: "",
        lastChangeTime: "",
        fontNum: 0,
        isMobile: window.innerWidth < 768
    }

    processDate(date) {
        let a = date.split("T")[0];
        let b = String(date.split("T")[1]);
        b = b.split(".")[0];
        return a + ' ' + b;
    }
    
    componentDidMount() {
        this.getPaperInfo(this.props.location.pathname.split('/')[2]);
    }

    componentDidUpdate(prevProps) {
        if(this.props.location.pathname !== prevProps.location.pathname) {
			console.log(this.props.location.pathname);
            this.getPaperInfo(this.props.location.pathname.split('/')[2]);
        }
    }

    getPaperInfo = (name) => {
        const post = (site.posts || []).find(p => p.slug === name);
        
        if (!post) {
            setTimeout(() => { //给一个Effect时间让路由切换完成
                this.props.navigate("/404", { replace: true });
            });
            return;
        }

        this.setState({
            name: post.title, 
            publishedAt: String(post.createdDate), 
            lastChangeTime: String(post.lastModifyDate), 
            fontNum: post.fontNum
        });
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="paper-banner">
                    <div className="paper-banner-content">
                        <h1 align='center'>{this.state.name}</h1>
                        <div className="paperInfo">
                            <p className='paper-banner-content-font'>
                                <i class="bi bi-calendar" />
                                &nbsp;
                                发表时间：{this.processDate(this.state.publishedAt)}
                            </p>
                            {this.state.isMobile ? null : (<p className='paper-banner-content-font'>
                                &emsp;|&emsp;</p>)}
                            <p className='paper-banner-content-font'>
                                <i className="bi bi-clock" />
                                &nbsp;
                                最后更新时间：{this.state.lastChangeTime}
                            </p>
                            {this.state.isMobile ? null : (<br />)}
                            <p className='paper-banner-content-font font-num'>
                                <i className="bi bi-file-earmark-font" />
                                &nbsp;
                                总字数：{this.state.fontNum}
                            </p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function PaperBannerWrapper(props) {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <PaperBanner
            {...props}
            params={params}
            location={location}
            navigate={navigate}
        />
    );
}

export default PaperBannerWrapper;