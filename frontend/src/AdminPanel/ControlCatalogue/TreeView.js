import React from 'react';
import './TreeView.css';
import md5 from 'md5';

function handleClick(e, id, data, f, f1) {
    let t = document.getElementById(id);
    let elements = document.querySelectorAll('.tree-element-hover');
    elements.forEach((e)=>{
        e.classList.remove('tree-element-hover');
    });
    let target = e.target;
    while (target !== t) {
        target = target.parentNode;
    }
    if (target == t) {
        console.log(id);
        target.classList.add('tree-element-hover');
        // f(data);
        // f1();
    }
}

export function TreeView({
    data,
    selected = false,
    toggled = true,
    name = null,
    isLast = true,
    isChildElement = false,
    isParentToggled = true,
    editCatalogueItem,
    showEditForm
}) {
    
    const [isToggled, setIsToggled] = React.useState(toggled);
    const [isSelected, setIsSelected] = React.useState(selected);
    const id = md5(`${data.id_catalogue}`);
    let innerClick = null;
    if (isChildElement) {
        innerClick = handleClick;
    } else {
        innerClick = () => {
            
        };
    }

    
    return (
        <div
            style={{ marginLeft: isChildElement ? 16 : 4 + 'px' }}
            className={`${isParentToggled ? 'tree-element' : 'tree-element collapsed'} ${isSelected ? 'tree-element-hover' : ''}`}
            id={id}
            onClick={(e) => {
                console.log(e.target);
                {/* innerClick(e, id, data); */}
                {/* setIsSelected(!isSelected); */}
            }}
        >
            <span
                className={isToggled ? 'toggler' : 'toggler closed'}
                onClick={() => {setIsToggled(!isToggled);}}
            />
            {name ? <strong>&nbsp;&nbsp;{name}: </strong> : <span>&nbsp;&nbsp;</span>}
            {Array.isArray(data) ? '[' : '{'}
            {!isToggled && '...'}
            {Object.keys(data).map((v, i, a) =>
                typeof data[v] == 'object' ? (
                    <TreeView
                        data={data[v]}
                        isLast={i === a.length - 1}
                        name={Array.isArray(data) ? null : v}
                        isChildElement
                        isParentToggled={isParentToggled && isToggled}
                        key={`${i} - ${data[v]} - ${Math.random()}`}
                        editCatalogueItem={editCatalogueItem}
                        showEditForm={showEditForm}
                    />
                ) : (
                    <p
                        style={{ marginLeft: 16 + 'px' }}
                        className={isToggled ? 'tree-element' : 'tree-element collapsed'}
                        key={`${i} - ${data[v]} - ${Math.random()}`}
                    >
                        {Array.isArray(data) ? '' : <strong>{v}: </strong>}
                        <span
                            style={{ cursor: "pointer" }}
                        >{data[v]}</span>
                        {i === a.length - 1 ? '' : ','}
                    </p>
                )
            )}
            {Array.isArray(data) ? ']' : '}'}
            {!isLast ? ',' : ''}
        </div>
    );
}

export default TreeView;