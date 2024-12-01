import {
	IoIosArrowForward,
	IoIosArrowBack,
	IoLogoTwitter,
} from "react-icons/io";
import { BsTwitterX } from "react-icons/bs";
import { TfiApple } from "react-icons/tfi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillAndroid } from "react-icons/ai";
import {
	FaFacebookF,
	FaGoogle,
	FaPlay,
	FaPlus,
	FaStar,
	FaYoutube,
	FaChevronLeft,
	FaChevronRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function SeriesScreen() {

	const [activeIndex, setActiveIndex] = useState(0);
	const [series, setSeries] = useState([]);
	const apiKey = import.meta.env.VITE_TMDB_API_KEY;

	const fetchData = async () => {
		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`
			);
			const { results } = response.data;
			setSeries(results);
			console.log(results);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	const navigate = useNavigate();

	const handleSeriesClick = (item) => {
		navigate(`/each-series/${item.id}`, { state: { itemData: item } });
	};
	return (
		<div className='series-screen'>
			<NavBar/>
			<div className='series-content'>
				<Swiper
					effect='coverflow'
					grabCursor={true}
					centeredSlides={true}
					slidesPerView={4}
					spaceBetween={-20}
					loop={true}
					coverflowEffect={{
						rotate: 30,
						stretch: -80,
						depth: 200,
						modifier: 1,
						slideShadows: true,
					}}
					navigation={{
						nextEl: ".custom-next",
						prevEl: ".custom-prev",
					}}
					onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
					onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
					modules={[EffectCoverflow, Navigation]}
				>
					{series.map((item, index) => (
						<SwiperSlide key={item.id}>
							<a
								className={`slide-content ${
									index === activeIndex ? "active" : ""
								}`}
								onClick={() => handleSeriesClick(item)}
							>
								<img
									src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
									alt={`series ${item.id}`}
									className='series-image'
								/>
								{index === activeIndex && (
									<div className='series-details'>
										<h3 className='series-title'>{item.original_name}</h3>
										<p>
											<span style={{ color: "yellow" }}>
												<FaStar />
												{item.vote_average}
											</span>
											({item.first_air_date.split("-")[0]}) Action, Romance,
											Drama
										</p>
										<div className='buttons'>
											<button className='btn btn-primary'>
												<FaPlay className='btn-icon' /> Watch
											</button>
											<button className='btn btn-success'>
												<FaPlus className='btn-icon' /> My List
											</button>
										</div>
									</div>
								)}
							</a>
						</SwiperSlide>
					))}
				</Swiper>
				<button className='custom-prev'>
					<IoIosArrowBack />
				</button>
				<button className='custom-next'>
					<IoIosArrowForward />
				</button>
			</div>
			<div className='series-middle-content'>
				<div className='col-one'>
					<TfiApple className='icon one' />
					<AiFillAndroid className='icon two' />
					<p> Download Akeray mobile app today</p>
				</div>
				<div className='col-two'>
					<div className='search-bar'>
						<input type='text' placeholder='Search by genres' />
						<p>Search</p>
					</div>
					<p>English, Spanish, Mandarin, French, Arabic.</p>
				</div>
				<div className='col-three'>
					<p> follow us on social media</p>
					<div className='social-icons'>
						<FaFacebookF />
						<IoLogoTwitter />
						<FaYoutube />
						<FaGoogle />
						<BsTwitterX />
					</div>
				</div>
			</div>
			<div className='series-last-content'>
				<h2>TOTAL IS IN QUEUE</h2>
				<p>Continue Watching</p>
				<div className='series-swiper'>
					<Swiper
						modules={[Navigation]}
						navigation={{
							prevEl: ".swiper-button-prev",
							nextEl: ".swiper-button-next",
						}}
						spaceBetween={20}
						slidesPerView={5}
						loop={false}
					>
						{series.map((item) => (
							<SwiperSlide key={item.id}>
								<div className='series-container'>
									<img
										src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
										alt={`series ${item.id + 1}`}
										className='series-image'
									/>
									<h3 className='series-text'>{item.original_name}</h3>
									<p>Season 3 Episode 5</p>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
					<div className='swiper-buttons-container'>
						<div className='swiper-button-prev'>
							<FaChevronLeft className='icon-series-swiper' />
						</div>
						<div className='swiper-button-next'>
							<FaChevronRight className='icon-series-swiper' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SeriesScreen;
