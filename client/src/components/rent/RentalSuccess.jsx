import React from 'react';
import HeaderRent from '../common/HeaderRent';

const RentalSuccess = () => {
    const location = useLocation()
	const message = location.state?.message
	const error = location.state?.error
    return (
        <div className="container">
			<HeaderRent title="Rental Success" />
			<div className="mt-5">
				{message ? (
					<div>
						<h3 className="text-success"> Kiralama Başarılı.!</h3>
						<p className="text-success">{message}</p>
					</div>
				) : (
					<div>
						<h3 className="text-danger"> Kiralama Başarısız.</h3>
						<p className="text-danger">{error}</p>
						
					</div>
				)}
			</div>
		</div>
    );
}

export default RentalSuccess;
