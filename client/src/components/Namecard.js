const Namecard = ({card, onDelete, onEdit}) => {
    return (
        <div className="card" id={card.id}>
            <div className="photo">
                <img src={card.image_url} alt=""/>
            </div>
            <div className="heading">{card.first_name} {card.last_name}</div>
            <div className="body">
                    <p>{card.description}</p>
                    <div className="showOnHover">
                        <button className="removeBtn" onClick={()=>onDelete(card.id)}>REMOVE</button>
                        <button className="editBtn" onClick={()=>onEdit(card)}>EDIT</button>
                    </div>
            </div>
        </div>
    );
}

export default Namecard;