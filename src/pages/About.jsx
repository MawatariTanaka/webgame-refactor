// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import myImg from "../images/about/anh1.jpg";
import myImg2 from "../images/about/minh.jpg";
import myImg3 from "../images/about/357738842_692630186006100_6769006847746935606_n.jpg";
import myImg4 from "../images/about/357988508_2646908752126947_4556779663336623208_n.jpg";

import "../styles/About.css";

export default function About() {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 7000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {/* slide 1 */}

                <SwiperSlide className="slide">
                    <div className="home">
                        <div className="home-content">
                            <h3>Hello, It's me</h3>
                            <h1>Vu Tuan An</h1>
                            <h3>Front-end Developer, Leader team</h3>
                            <p>
                                Coming up with ideas for the project, create the
                                Rock Paper Scissors Game, <br /> assigning tasks
                                to team members
                            </p>
                            <div className="contact">
                                <a href="#">
                                    <i class="bx bxl-facebook"></i>
                                </a>
                                <a href="#">
                                    <i class="bx bxl-instagram"></i>
                                </a>
                                <a href="#">
                                    <i class="bx bxl-github"></i>
                                </a>
                                <a href="#">
                                    <i class="bx bxl-twitter"></i>
                                </a>
                            </div>
                        </div>
                        <div className="img">
                            <img src={myImg} />
                        </div>
                    </div>
                </SwiperSlide>

                {/* slide 2 */}
                <SwiperSlide className="slide ">
                    <div className="home">
                        <div className="home-content">
                            <h3>Hello, It's me</h3>
                            <h1>Bui Nhat Minh</h1>
                            <h3>Front-end Developer</h3>
                            <p>Create the Memory Game, Chat Box</p>
                            <div className="contact">
                                <a href="#">
                                    <i class="bx bxl-facebook"></i>
                                </a>
                                <a href="#">
                                    <i class="bx bxl-instagram"></i>
                                </a>
                                <a href="#">
                                    <i class="bx bxl-github"></i>
                                </a>
                                <a href="#">
                                    <i class="bx bxl-twitter"></i>
                                </a>
                            </div>
                        </div>
                        <div className="img">
                            <img src={myImg2} />
                        </div>
                    </div>
                </SwiperSlide>

                {/* slide 3 */}
                <SwiperSlide className="slide ">
                    <div className="home">
                        <div className="home-content">
                            <h3>Hello, It's me</h3>
                            <h1>Hoang Huu Duc</h1>
                            <h3>Front-end Developer</h3>
                            <p>Login Page, Register Page, About Page</p>
                            <div className="contact">
                                <a href="#">
                                    <i class="bx bxl-facebook"></i>
                                </a>
                                <a href="#">
                                    <i class="bx bxl-instagram"></i>
                                </a>
                                <a href="#">
                                    <i class="bx bxl-github"></i>
                                </a>
                                <a href="#">
                                    <i class="bx bxl-twitter"></i>
                                </a>
                            </div>
                        </div>
                        <div className="img">
                            <img src={myImg3} />
                        </div>
                    </div>
                </SwiperSlide>
                {/* slide 4 */}
                <SwiperSlide className="slide ">
                    <div className="home">
                        <div className="home-content">
                            <h3>Hello, It's me</h3>
                            <h1>Nguyen Khuong Duy</h1>
                            <h3>Front-end Developer, Leader team</h3>
                            <p>Admin Page, User Management</p>
                            <div className="contact">
                                <a href="#">
                                    <i class="bx bxl-facebook"></i>
                                </a>
                                <a href="#">
                                    <i class="bx bxl-instagram"></i>
                                </a>
                                <a href="#">
                                    <i class="bx bxl-github"></i>
                                </a>
                                <a href="#">
                                    <i class="bx bxl-twitter"></i>
                                </a>
                            </div>
                        </div>
                        <div className="img">
                            <img src={myImg4} />
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
