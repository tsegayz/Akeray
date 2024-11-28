import {
	IoIosNotifications,
	IoIosSearch,
	IoMdTrendingUp,
	IoMdEye,
	IoMdHeart,
} from "react-icons/io";
import { GiWaterSplash } from "react-icons/gi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { MdLocalMovies } from "react-icons/md";
import {
	FaPlay,
	FaPlus,
	FaStar,
	FaCheck,
	FaChevronLeft,
	FaChevronRight,
} from "react-icons/fa";
import { PiFireFill } from "react-icons/pi";
import { IoLanguageSharp } from "react-icons/io5";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import img1 from "../assets/blackish.jpg";
import img2 from "../assets/despicable.jpg";
import img3 from "../assets/sune.jpeg";
import axios from "axios";

function HomeScreen() {
	const links = [
		{ title: "Home", link: "/" },
		{ title: "Movies", link: "/movies" },
		{ title: "Series", link: "/series" },
		{ title: "My List", link: "/mylist" },
		{ title: "Trending", link: "/trending" },
		{ title: "Tv Shows", link: "/tvshows" },
	];
	const genres = [
		"Action",
		"Animation",
		"Adventures",
		"Biography",
		"Crime",
		"Comedy",
		"Drama",
	];
	const collections = [
		{
			title: "Trends Now",
			icon: <IoMdTrendingUp />,
		},
		{
			title: "Popular",
			icon: <PiFireFill />,
		},
		{
			title: "Premieres",
			icon: <FaStar />,
		},
		{
			title: "Recently Added",
			icon: <FaPlus />,
		},
	];
	const collectionsTwo = [
		{
			title: "Movies",
			icon: <BiSolidMoviePlay />,
		},
		{
			title: "Series",
			icon: <MdLocalMovies />,
		},
		{
			title: "Original Series",
			icon: <FaCheck />,
		},
		{
			title: "Search",
			icon: <IoIosSearch />,
		},
	];
	const [selectedGenre, setSelectedGenre] = useState("Action");
	const [selectedCollection, setSelectedCollection] = useState("Trends Now");
	const [selectedCollectionTwo, setSelectedCollectionTwo] = useState("Movies");

	const handleGenreClick = (genre) => {
		setSelectedGenre((prev) =>
			prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
		);
	};
	const handleCollectionClick = (col) => {
		setSelectedCollection((prev) => (prev === col ? null : col));
		setSelectedCollectionTwo((prev) => (prev === col ? null : col));
	};
	const slideContent = [
		{
			img: img1,
			title: "Black-ish",
			descr:
				"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel. ",
		},
		{
			img: img2,
			title: "Despicable Me",
			descr:
				"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel. ",
		},
		{
			img: img3,
			title: "Dune",
			descr:
				"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel. ",
		},
	];

	const footerLinks = [
		{
			title: "Questions? Contact us.",
			links: ["FAQ", "Investor Relations", "Privacy", "Speed Test"],
		},
		{
			title: null,
			links: ["Jobs", "Help Center", "Privacy", "Speed Test"],
		},
		{
			title: null,
			links: [
				"Account",
				"Ways to watch",
				"Corporate information",
				"Only on Akeray",
			],
		},
		{
			title: null,
			links: ["Medical Center", "Terms of use", "Contact us"],
		},
	];

	const [movies, setMovies] = useState([]);
	const [maxRating, setMaxRating] = useState(5);
	const [filteredMovies, setFilteredMovies] = useState([]);
	const apiKey = import.meta.env.VITE_TMDB_API_KEY;

	const fetchData = async () => {
		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`
			);
			const { results } = response.data;
			setMovies(results);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		const filtered = movies.filter((movie) => movie.vote_average >= maxRating);
		setFilteredMovies(filtered);
	}, [maxRating, movies]);

	const handleMaxRatingChange = (e) => {
		setMaxRating(Number(e.target.value));
	};

	return (
		<div className='home-screen'>
			<nav className='navbar navbar-expand-lg navbar-light bg-black'>
				<a className='navbar-brand' href='#'>
					Akeray
				</a>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav mr-auto'>
						{links.map((item) => (
							<li className='nav-item active' key={item.link}>
								<a className='nav-link' href='#'>
									{item.title}
								</a>
							</li>
						))}
					</ul>
					<div className='nav-icons'>
						<span>
							<IoIosSearch />
						</span>
						<span>
							<IoIosNotifications />
						</span>
						<Link className='btn btn-outline-light'to='/sign' >
							<div className='btn-icon'>
								<GiWaterSplash />
							</div>
						</Link>
					</div>
				</div>
			</nav>
			<div className='home-content'>
				<Swiper
					modules={[Autoplay, Pagination]}
					loop={true}
					autoplay={{
						delay: 6000,
						disableOnInteraction: false,
					}}
					speed={1000}
					pagination={{
						clickable: true,
					}}
				>
					{slideContent.map((item) => (
						<SwiperSlide key={item.title}>
							<div className='slide-container'>
								<img src={item.img} alt='Image 1' className='slide-image' />
								<div className='slide-info'>
									<p> Duration: 51m</p>
									<section className='slide-detail'>
										<FaStar style={{ color: "#FEC710" }} />
										<p>
											Season <span>8</span>
										</p>
										<p>
											Episode <span>12</span>
										</p>
										<p> -Still Gotta Mean Something</p>
									</section>
									<h2 className='slide-text'>{item.title}</h2>
									<p className='slide-desc'> {item.descr} </p>
									<div className='buttons'>
										<button className='btn btn-primary btn-lg shadow d-flex align-items-center'>
											<span className='icon'>
												<FaPlay />
											</span>
											Watch
										</button>

										<button className='btn btn-success btn-lg shadow d-flex align-items-center'>
											<span className='icon'>
												<FaPlus />
											</span>
											Add
										</button>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			<div className='home-content-three'>
				<div className='collection'>
					{collections.map((item) => (
						<div
							className={`collection-item ${
								selectedCollection == item.title ? "selected" : ""
							}`}
							key={item.title}
						>
							<span> {item.icon}</span>
							<p> {item.title}</p>
						</div>
					))}
				</div>
				<div className='genre'>
					{genres.map((item) => (
						<p
							className={`genre-item ${
								selectedGenre.includes(item) ? "selected" : ""
							}`}
							key={item}
							onClick={() => handleGenreClick(item)}
						>
							{item}
						</p>
					))}
				</div>
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
					{movies.map((item) => (
						<SwiperSlide key={item.id}>
							<div className='movie-container'>
								<img
									src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
									alt={`movie ${item.id + 1}`}
									className='movie-image'
								/>
								<p className='movie-text'>{item.original_title}</p>
							</div>
						</SwiperSlide>
					))}
					<div className='swiper-button-prev'>
						<FaChevronLeft />
					</div>
					<div className='swiper-button-next'>
						<FaChevronRight />
					</div>
				</Swiper>
			</div>

			<div className='home-content-three'>
				<div className='collection'>
					{collectionsTwo.map((item) => (
						<div
							className={`collection-item ${
								selectedCollectionTwo === item.title ? "selected" : ""
							}`}
							key={item.title}
							onClick={() => handleCollectionClick(item.title)}
						>
							<span>{item.icon}</span>
							<p>{item.title}</p>
						</div>
					))}
				</div>
				<div className='genre'>
					{genres.map((item) => (
						<p
							className={`genre-item ${
								selectedGenre.includes(item) ? "selected" : ""
							}`}
							key={item.title}
							onClick={() => handleGenreClick(item)}
						>
							{item}
						</p>
					))}
				</div>
				<section className='filtering'>
					<div className='filter-left'>
						<p> Sort By: </p>
						<span> Latest </span>
						<select>
							<option value='latest'>Year</option>
							<option value='popularity'>Rating</option>
							<option value='rating'>View</option>
							<option value='release_date'>Release Date</option>
						</select>
						<select>
							<option value='alphabet'>A -Z </option>
							<option value='popularity'>Rating</option>
							<option value='view'>View</option>
							<option value='release_date'>Release Date</option>
						</select>
					</div>
					<div className='rating-slider' style={{ color: "yellow" }}>
						<label>
							<FaStar />
						</label>
						<input
							type='range'
							min='1'
							max='8'
							step='0.1'
							value={maxRating}
							onChange={handleMaxRatingChange}
							style={{
								"--value": maxRating,
							}}
						/>
						<p> {maxRating} </p>
					</div>
				</section>

				<div className='home-content-four'>
					{filteredMovies.slice(0, 12).map((item) => (
						<div className='show-container' key={item.id}>
							<img
								src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
								alt={`show ${item.id + 1}`}
								className='show-image'
							/>
							<p className='show-text'>{item.original_title}</p>
							<div className='show-description'>
								<p>{item.release_date.split("-")[0]}</p>
								<div className='show-description-detail'>
									<IoMdHeart />
									<IoMdEye />
									<span
										style={{
											display: "flex",
											alignItems: "center",
											color: "yellow",
										}}
									>
										<FaStar size={"10px"} /> {item.vote_average}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<footer className='footer'>
				<div className='footer-content'>
					{footerLinks.map((section, index) => (
						<div className='footer-column' key={index}>
							{section.title && <p className='footer-title'>{section.title}</p>}
							<ul className='footer-links'>
								{section.links.map((link, idx) => (
									<li key={idx} className='footer-link'>
										{link}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
				<div className='footer-language'>
					<IoLanguageSharp/>
					<select className='language-button'>
						<option value='amharic'>Amharic</option>
						<option value='english'>English</option>
						<option value='french'>French</option>
					</select>
				</div>
			</footer>
		</div>
	);
}

export default HomeScreen;
