import React from 'react';
import Image from 'next/image';
import StarIcon from '@heroicons/react/solid/StarIcon';
import Currency from 'react-currency-formatter-v2';
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '../slices/basketSlice';

function CheckoutProduct({ id, title, price, description, category, image, hasPrime, rating }) {
    const dispatch = useDispatch()
    const addItemToBasket = () => {
        const product= {id, title, price, description, category, image, hasPrime, rating}
        dispatch(addToBasket(product));
    }
    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({id}));
    }

    return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />
      {/* Middle Section */}
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating).fill(1).map((val, ind) => (
            <StarIcon key={ind} className="h-5 text-yellow-500" />
          ))}
        </div>
        <p className="text-xs mt-2 line-clamp-3">{description}</p>
        {/* Note line-clamp-3 means only the first 3 lines of the description will be used. */}
        <div className="flex flex-col">
          <Currency quantity={price} currency="INR" />
          {hasPrime && (
            <div className="flex items-center mt-2">
              <img
                loading="lazy"
                className="w-24"
                src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/deliveryPage/Check-prime-PC-223X121.png"
                alt=""
              />
              <p className="text-xs text-gray-500">FREE Next Day Delivery</p>
            </div>
          )}
        </div>
      </div>
        
       {/* Right side add and remove buttons */}
       <div className='flex flex-col space-y-2 mt-auto justify-self-end'>
        <button className='button' onClick={addItemToBasket}>Add to Basket</button>
        <button className='button' onClick={removeItemFromBasket}>Remove from Basket</button>
       </div>
    </div>
  );
}

export default CheckoutProduct;
