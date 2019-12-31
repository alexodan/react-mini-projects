import React from 'react';
import './Stars.css';
import utils from './utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Stars({ stars }) {
	return (
		<div className="row ">
			{utils.range(1, stars).map((star) => <FontAwesomeIcon key={star} icon={faStar} className="star" />)}
		</div>
	);
}
export default Stars;
