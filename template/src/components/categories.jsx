import React, { Component } from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Categories() {
    const [categories, setCategories] = useState({
        "全部" : "all", 
        "IT" : "IT", 
        "生活" : "life", 
        "学习" : "study", 
        "旅行" : "trip", 
        "梦话" : "dream", 
        "其他": "others"
    });
    const [category, setCategory] = useState("all");

    const location = useLocation();
    useEffect(() => {
        const param = location.search.split("tags=")[1] || "all";
        let reverseCategory = "全部";
        for (const [key, value] of Object.entries(categories)) {
            if (value === param) {
                reverseCategory = key;
                break;
            }
        }
        setCategory(reverseCategory);
    }, [location])

    const categoriesList = useRef(null);
    const overray = useRef(null);

    const onClickCategory = () => {
        categoriesList.current.classList.toggle("show");
        overray.current.classList.toggle("show");
    }

    const onClickOverray = () => {
        categoriesList.current.classList.remove("show");
        overray.current.classList.remove("show");
    }

    return (
        <React.Fragment>
            <div className='categories'>
                <span onClick={() => onClickCategory()}>{category}</span>
            </div>
            <div className="card-widget categoriesList" ref={categoriesList}>
                {Object.entries(categories).map(([key, value], index) => {
                    if (key === category) return null;
                    return (
                        <Link to={`/posts/all?tags=${value}`} key={index} className="categoriesList-item">
                            <span>{key}</span>
                        </Link>
                    );
                })}
            </div>
            <div className="categories-overray" ref={overray} onClick={() => onClickOverray()}></div>
        </React.Fragment>
    )
}

export default Categories;