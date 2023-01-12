import React from 'react'
import './FoodItemCard.css'

function FoodItemCard({category, description, imgUrl, price, title}) {
  return (
    <div className='col-md-3'>
      <div className="food-item-card">
        <div>
          <img src={imgUrl} class="food-item-card-header-img"/>
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{price}/- Only</p>
        <span>{category}</span>
      </div>
    </div>
  )
}

export default FoodItemCard