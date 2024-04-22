import React, { useEffect, useState } from "react";
import "./style/index.css";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { FaRegCirclePlay, FaGreaterThan } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VideoCard from "../../Components/MainPage/VideoCard";
import ImageCard from "../../Components/MainPage/ImageCard";
import StoriesCard from "../../Components/MainPage/StoriesCard";
import NewsCard from "../../Components/MainPage/NewsCard";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Col, Modal, Progress, Radio, Row } from "antd";
import { API_URL } from "../../../API";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";
const { Meta } = Card;

import img1 from "../../assets/img-main1.png";
import img2 from "../../assets/img-main-2.png";
import img3 from "../../assets/Rectangle 33.png";
import img4 from "../../assets/Rectangle 28.png";
import img5 from "../../assets/img-5.png";
import img6 from "../../assets/Group 50.png";
import img7 from "../../assets/Rectangle 67.png";
import img8 from "../../assets/Rectangle 50.png";
import slider from "../../assets/slider (2).png";

const MainPage = () => {
  const [sliderItem, setSliderItem] = useState(0);
  const [imag1, setimag1] = useState();
  const [showItem, setShowItem] = useState(true);
  const [userData, setUserData] = useState([]);
  const [flashnews, setflashnews] = useState([]);
  const [Article, setArticle] = useState([]);
  const [video, setVideo] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [ArticleTop, setArticleTop] = useState(null);
  const [isModal2Open, setIsModal2Open] = useState(true);
  const [breakingNews, setbreakingNews] = useState([]);
  const [val, setVal] = useState("");
  const sliderItems = [slider, img1, img2, img4];
  const { t } = useTranslation();
  const [midAd, setMidAd] = useState({});
  const [bottomAd, setBottomAd] = useState({});
  const [topStories, settopStories] = useState([]);
  const navigation = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPoll, setCurrentPoll] = useState(null);
  const [pollOptions, setPollOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [stories, setStories] = useState(null);

  useEffect(() => {
    // Fetch stories when the component mounts
    const fetchStories = async () => {
      try {
        const response = await axios.get(`${API_URL}/story`);
        setStories(response.data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, []);

  useEffect(() => {
    axios
      .get(
        `${API_URL}/article?pagenation=true&limit=6&type=img&newsType=topStories&status=online`
      )
      .then((data) => {
        settopStories(data.data);
      })
      .catch(() => {});
    axios
      .get(
        `${API_URL}/article?pagenation=true&limit=6&type=img&newsType=breakingNews&status=online`
      )
      .then((data) => {
        setbreakingNews(data?.data);
        console.log(data);
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    axios
      .get(`${API_URL}/polls`)
      .then((response) => {
        const pollsData = response.data;
        const latestPoll = pollsData.length > 0 ? pollsData[0] : null;
        setCurrentPoll(latestPoll);
        setPollOptions(latestPoll ? latestPoll.options : []);
      })
      .catch((error) => {
        console.error("Error fetching polls:", error);
        // Handle error
      });
  }, []);

  const submitVote = async (pollId, optionIndex) => {
    try {
      // Call the backend API to update total votes
      const response = await axios.post(`${API_URL}/polls/${pollId}/vote`, {
        pollId,
        optionIndex,
      });

      // Handle the response if needed
    } catch (error) {
      // Handle errors if the API call fails
      console.error("Error submitting vote:", error);
    }
  };

  useEffect(() => {
    axios.get(`${API_URL}/ads?active=true&side=mid`).then((data) => {
      setMidAd(data.data.reverse()[0]);
    });
    axios.get(`${API_URL}/ads?active=true&side=bottom`).then((data) => {
      setBottomAd(data.data.reverse()[0]);
    });
  }, []);
  const showModal2 = () => {
    setIsModal2Open(true);
  };
  const handleCancel2 = () => {
    setIsModal2Open(false);
  };
  useEffect(() => {
    axios
      .get(`${API_URL}/article?pagenation=true&limit=6&type=img`)
      .then((data) => {
        setArticle(data.data);
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    axios
      .get(`${API_URL}/article?pagenation=true&limit=4&type=vid`)
      .then((data) => {
        setVideo(data.data);
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    axios
      .get(`${API_URL}/article?pagenation=true&limit=6&type=img&page=2`)
      .then((data) => {
        setLatestNews(data.data);
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    axios
      .get(`${API_URL}/article?id=6524337309c3cf5a3cca172a`)
      .then((data) => {
        setArticleTop(data.data[0]);
        console.log(Article);
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    axios
      .get(`${API_URL}/flashnews`)
      .then((users) => {
        const activeFlashNews = users.data.filter(
          (item) => item.status === "active"
        );
        setflashnews(activeFlashNews);
      })
      .catch((err) => {
        console.log(err);
      });

    // axios
    //   .get(`${API_URL}/poll`)
    //   .then((users) => {
    //     setUserData(users.data.reverse()[0]);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashnews.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === flashnews.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className="main-page-conatiner">
        <div className="container3">
          <div className="main-page-flash-news container">
            <div className="flash-news-1">{t("fn")}</div>
            <div className="flash-news-2">
              <div className="flash-news-slider">
                <div className="flash-news-2-text">
                  {flashnews.length > 0 && (
                    <a
                      href={flashnews[currentIndex].link}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {flashnews[currentIndex].slugName}
                    </a>
                  )}
                </div>
                <div className="flash-news-2-icons">
                  <IoMdArrowDropleft size={25} onClick={handlePrevClick} />
                  <IoMdArrowDropright size={25} onClick={handleNextClick} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-conatiner container container3">
          <div className="main-rigth-side">
            <div className="image-conatiner">
              <div className="main-conatiner-image-1">
                <ImageCard
                  height="100%"
                  width="100%"
                  img={breakingNews?.[0]?.image}
                  text={breakingNews?.[0]?.title}
                  title={breakingNews?.[0]?.title}
                  id={breakingNews?.[0]?._id}
                />
              </div>
              {console.log(breakingNews)}
              <div
                className="main-conatiner-image-2"
                style={{
                  marginLeft: "10px",
                }}
              >
                <ImageCard
                  img={breakingNews?.[1]?.image}
                  text={breakingNews?.[1]?.title}
                  title={breakingNews?.[0]?.title}
                  id={breakingNews?.[1]?._id}
                  height="100%"
                  width="100%"
                />
              </div>
            </div>
            <div className="main-page-slider-setting">
              {sliderItem === 1 ? (
                <div
                  style={{
                    width: "400px",
                    height: "180px",
                    background: "White",
                    marginTop: 10,
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <div
                    style={{
                      fontWeight: "600",
                      fontSize: 18,
                      textAlign: "start",
                      fontFamily: "Poppins",
                    }}
                  >
                    {currentPoll.question}
                  </div>
                  <Radio.Group
                    value={selectedOption}
                    style={{ width: "100%", marginTop: "20px" }}
                  >
                    <Row gutter={12}>
                      {pollOptions.map((option, index) => (
                        <Col xs={12} key={index}>
                          <div
                            style={{
                              width: "90%",
                              height: "40px",
                              borderRadius: 10,
                              border: "1px solid black",
                              marginBottom: 10,
                              alignItems: "center",
                              display: "flex",
                              paddingLeft: "10px",
                              textTransform: "capitalize",
                            }}
                          >
                            <Radio
                              onClick={() => {
                                if (selectedOption === null) {
                                  setSelectedOption(index);
                                  submitVote(currentPoll._id, index);
                                }
                              }}
                              value={index}
                              disabled={selectedOption !== null}
                            >
                              <div
                                style={{
                                  fontSize: "18px",
                                  fontWeight: "600",
                                  marginTop: "-10px",
                                }}
                              >
                                {option.optionText}
                              </div>
                            </Radio>

                            {selectedOption !== null && (
                              <Progress
                                percent={option.percentage.toFixed(0)} // Adjust the decimal places as needed
                                size="small"
                              />
                            )}
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Radio.Group>
                </div>
              ) : (
                <img
                  src={sliderItems[sliderItem]}
                  alt=""
                  className={`slider-img ${showItem ? "show" : ""}`}
                />
              )}
              <div className="main-page-slider-items">
                {[0, 1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className={`slider-item ${
                      sliderItem === item ? "slider-item-active" : ""
                    }`}
                    onClick={() => {
                      setShowItem(false);
                      setTimeout(() => {
                        setShowItem(true);
                        setSliderItem(item);
                      }, 1000);
                    }}
                  ></div>
                ))}
              </div>
            </div>
            <div className="more-text">
              {"more"}{" "}
              <FaGreaterThan
                style={{
                  marginLeft: "6px",
                }}
              />
            </div>
          </div>
          <div className="main-left-side">
            <div className="main-left-side-top">
              <div>{t("ts")}</div>
            </div>
            <div className="top-stories-all-cards">
              {console.log(topStories)}
              {topStories?.map((data, index) => {
                let title = data.title?.split(" ").join("-");

                if (title) {
                  return (
                    <StoriesCard
                      data={data}
                      key={index}
                      OnPress={() =>
                        navigation(`/details/${title}?id=${data?._id}`)
                      }
                      image={data?.image}
                      text={data?.title}
                    />
                  );
                } else {
                  console.error("Title is undefined or null for data:", data);
                  return null;
                }
              })}
            </div>
          </div>
        </div>
        <div className="main-news-area">
          <div className="news-main-side-left">
            <div className="main-news-heading">{t("ln")}</div>
            <div className="news-cards-area container3">
              {console.log(breakingNews)}
              {breakingNews.map((data) => {
                let title = data?.title?.split(" ").join("-");

                // Check if title is defined before rendering the NewsCard
                if (title) {
                  return (
                    <div className="news-card-items-area" key={data?._id}>
                      <NewsCard
                        data={data}
                        onPress={() =>
                          navigation(`/details/${title}?id=${data._id}`)
                        }
                      />
                    </div>
                  );
                } else {
                  // Handle the case where title is undefined or null
                  console.error("Title is undefined or null for data:", data);
                  return null; // or handle it in a way that makes sense for your application
                }
              })}

              {/* <div className="news-card-items-area">
                <NewsCard />
              </div>
              <div className="news-card-items-area">
                <NewsCard />
              </div>
              <div className="news-card-items-area">
                <NewsCard />
              </div>
              <div className="news-card-items-area">
                <NewsCard />
              </div>
              <div className="news-card-items-area">
                <NewsCard />
              </div> */}
            </div>
            <div className="more-text">
              {"more"}{" "}
              <FaGreaterThan
                style={{
                  marginLeft: "6px",
                }}
              />
            </div>
          </div>
          <div className="news-main-side-rigth">
            <div className="news-main-rigth-part1">
              <div className="main-news-heading">{t("bn")}</div>
              <div className="news-cards-area container3">
                <div className="news-card-items-area2 ">
                  <NewsCard />
                </div>
                <div className="news-card-items-area2">
                  <NewsCard />
                </div>
                <div className="news-card-items-area2">
                  <NewsCard />
                </div>
              </div>
              <div className="more-text">
                {"more"}{" "}
                <FaGreaterThan
                  style={{
                    marginLeft: "6px",
                  }}
                />
              </div>
            </div>
            <div className="news-main-rigth-part2">
              <a
                href={midAd?.link}
                target="_blank"
                style={{ position: "relative" }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "20px",
                    backgroundColor: "white",
                    position: "absolute",
                    top: 16,
                    textAlign: "center",
                  }}
                >
                  advertisement
                </div>
                <img
                  style={{ cursor: "pointer" }}
                  src={midAd?.imgLink}
                  alt=""
                />
                <div
                  style={{
                    width: "100%",
                    height: "80px",
                    backgroundColor: "white",
                    position: "absolute",
                    bottom: 0,
                    paddingLeft: 10,
                  }}
                >
                  <div style={{ fontSize: "16px", fontFamily: "Poppins" }}>
                    {midAd?.slugName}
                  </div>
                  <a href={midAd?.link}>{midAd?.link}</a>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="main-page-videos-conatiner container2 container3">
          <div className="main-page-video-heading">{t("v")}</div>
          <div className="video-cards">
            <div className="video-card-box-1">
              <VideoCard data={video && video[0]} />
              <VideoCard data={video && video[1]} />
            </div>
            <div className="divider-box">
              <div className="divider"></div>
            </div>
            <div className="video-box">
              <VideoCard height={400} width={500} data={video && video[3]} />
              {/* <div className="video-items-box">
                <FaRegCirclePlay size={50} color="red" style={{ zIndex: 1 }} />
                <div className="video-text-box">
                  <div>
                    War Of Words Between Babar, Shaheen After Pakistan's Asia
                    Cup Exit: Report
                  </div>
                </div>
              </div> */}
            </div>
            <div className="divider-box">
              <div className="divider"></div>
            </div>
            <div className="video-card-box-1">
              <VideoCard data={video && video[4]} />
              <VideoCard data={video && video[5]} />
            </div>
          </div>
        </div>
        <div className="main-page-technology-container container2 container3">
          <div className="main-page-technology-heading">{t("t")}</div>
          <div className="main-page-technology-area">
            <div>
              <div className="main-page-technology-first-column">
                <div
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <ImageCard
                    style={{
                      fontSize: "15px",
                      fontWeight: 400,
                      height: "40px",
                      borderRadius: 0,
                    }}
                    height="200px"
                    width="100%"
                    img={img4}
                    text="iPhone 15, iPhone 15 Plus, iPhone 15 Pro, iPhone 15 Pro Max Preorders Be..."
                  />
                </div>
                <div
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <ImageCard
                    style={{
                      fontSize: "15px",
                      fontWeight: 400,
                      height: "40px",
                      borderRadius: 0,
                    }}
                    height="200px"
                    width="100%"
                    img={img3}
                    text="iPhone 15, iPhone 15 Plus, iPhone 15 Pro, iPhone 15 Pro Max Preorders Be..."
                  />
                </div>
              </div>
              <div className="main-page-technology-first-column">
                <div
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <StoriesCard
                    height="120px"
                    width="80%"
                    color="transparent"
                    image={img5}
                    text={
                      "iPhone 15 price in India starts at Rs. 79,900 for the base model with 128GB of storage, while the iPhone 15 Plus with the same amount of storage starts at Rs. 89,900.."
                    }
                  />
                </div>
                <div
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <StoriesCard
                    height="120px"
                    width="80%"
                    color="transparent"
                    image={img5}
                    text={
                      "iPhone 15 price in India starts at Rs. 79,900 for the base model with 128GB of storage, while the iPhone 15 Plus with the same amount of storage starts at Rs. 89,900.."
                    }
                  />
                </div>
                <div
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <StoriesCard
                    height="120px"
                    width="80%"
                    color="transparent"
                    image={img5}
                    text={
                      "iPhone 15 price in India starts at Rs. 79,900 for the base model with 128GB of storage, while the iPhone 15 Plus with the same amount of storage starts at Rs. 89,900.."
                    }
                  />
                </div>
                <div className="more-text">
                  {"more"}{" "}
                  <FaGreaterThan
                    style={{
                      marginLeft: "6px",
                    }}
                  />
                </div>
              </div>
              <div className="main-page-technology-third-column">
                <VideoCard color="black" width="100%" />
                <VideoCard color="black" width="100%" />
                <div className="more-text">
                  {"more"}{" "}
                  <FaGreaterThan
                    style={{
                      marginLeft: "6px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="visual-stories-main-container container container3">
          <div className="main-page-technology-heading">{t("vs")}</div>
          <div className="visual-stories-main-container2 container3">
            <div className="visual-stories-main-container-part1">
              <div
                className="visual-stories-main-container-main-area"
                style={{
                  display: "flex", // Set display to flex
                  flexWrap: "wrap", // Allow wrapping to the next line
                }}
              >
                {stories &&
                  stories.length > 0 &&
                  stories.map((story) => (
                    <Col span={8} key={story._id}>
                      <Card
                        hoverable
                        style={{ marginBottom: 16, flex: 1 }}
                        cover={<img alt={story.title} src={story.image} />}
                      >
                        <Meta
                          title={story.title}
                          description="www.instagram.com"
                        />
                      </Card>
                    </Col>
                  ))}
              </div>
            </div>
          </div>
          {/* ... (your existing JSX code) */}
        </div>

        <div className="main-video-gallery-main-container container2 container3">
          <div className="main-page-video-heading2">{t("ph")}</div>
          <Slider
            className="main-video-gallery-imgs"
            dots={true}
            infinite={true}
            slidesToShow={4}
            slidesToScroll={1}
          >
            <div>
              <img src={Article.length > 0 ? Article[0].image : null} alt="" />
            </div>
            <div>
              <img src={Article.length > 0 ? Article[1].image : null} alt="" />
            </div>
            <div>
              <img src={Article.length > 0 ? Article[2].image : null} alt="" />
            </div>
            <div>
              <img src={Article.length > 0 ? Article[0].image : null} alt="" />
            </div>
            <div>
              <img src={Article.length > 0 ? Article[0].image : null} alt="" />
            </div>
            <div>
              <img src={Article.length > 0 ? Article[0].image : null} alt="" />
            </div>
            <div>
              <img src={Article.length > 0 ? Article[0].image : null} alt="" />
            </div>
          </Slider>
        </div>
      </div>
      {/* <Modal
        title="Polling Modal"
        open={isModal2Open}
        onCancel={handleCancel2}
        onOk={() => {
          sessionStorage.setItem("data", "yes");
          handleCancel2();
        }}
      >
        <div>{userData.question}</div>
        <Radio.Group>
          <Radio value={1}>{userData.option1}</Radio>
          <br />
          <Radio value={2}>{userData.option2}</Radio>
        </Radio.Group>
      </Modal> */}
    </>
  );
};

export default MainPage;
