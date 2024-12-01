/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import NavBar from "../components/NavBar";

function EachSeries() {
	const location = useLocation();
	const { itemData } = location.state;
	const [activeIndex, setActiveIndex] = useState(0);
    const [swiperInstance, setSwiperInstance] = useState(null);

	const [seasons, setSeasons] = useState([]);
	const apiKey = import.meta.env.VITE_TMDB_API_KEY;
	const fetchSeasons = async () => {
		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/tv/${itemData.id}?api_key=${apiKey}&language=en-US`
			);
			setSeasons(response.data.seasons);
			console.log(response.data.seasons);
		} catch (error) {
			console.error("Error fetching seasons data:", error);
		}
	};

    const handleIndicatorClick = (index) => {
        setActiveIndex(index); 
        swiperInstance.slideToLoop(index); 
      };
	useEffect(() => {
		fetchSeasons();
	}, []);

	return (
		<div className='each-series-screen'>
			<NavBar />
			<div className='each-series-content'>
				<h1>{itemData.name}</h1>
				<Swiper
					effect='coverflow'
					grabCursor={true}
					centeredSlides={true}
					slidesPerView={2}
					spaceBetween={-80}
					loop={true}
					coverflowEffect={{
						rotate: 0,
						stretch: -100,
						depth: 100,
						modifier: 2.5,
						slideShadows: true,
					}}
					onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
					onSwiper={(swiper) => setActiveIndex(swiper)}
					modules={[EffectCoverflow, Navigation]}
				>
					{seasons.map((season, index) => (
						<div key={season.id}>
							<SwiperSlide>
								<a
									className={`series-slide-content ${
										index === activeIndex ? "active" : ""
									}`}
								>
									<div key={season.id} className='season-card'>
										<img
											src={`https://image.tmdb.org/t/p/w500/${season.poster_path}`}
											alt={season.name}
										/>
										<h3>{season.name}</h3>
									</div>
								</a>
							</SwiperSlide>
						</div>
					))}
				</Swiper>
				<div className='season-indicator'>
					{seasons.map((item, index) => (
						<div
							key={item.name}
							className={`box ${
								index === activeIndex ? "active-indicator" : ""
							}`}
						>
							<a onClick={()=>handleIndicatorClick(index)}> {item.season_number}</a>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default EachSeries;
