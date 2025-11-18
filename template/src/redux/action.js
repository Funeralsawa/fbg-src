const Actions = {
    CT_TOC: "cttoc",
    SET_TOC: "settoc",
    SET_ID: "setid"
}

export const setTargetNode = (node) => ({
    type: Actions.CT_TOC,
    payload: node
});

export const setToc = (toc) => ({
    type: Actions.SET_TOC,
    payload: toc,
});

export const setID = (id) => ({
    type: Actions.SET_ID,
    payload: id
})

export default Actions;