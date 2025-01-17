/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader } from "../../components";
import profile from "../../assets/temp_profile.jpeg";
import Image from "next/image";
import styles from "../../styles/User.module.css";
import logo from "../../assets/logo.png";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaDev,
} from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import Error from "../404";
import { CustomTitle, SupabaseClient } from "../../utils";

const UserProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(false);

  async function fetchUser() {
    await SupabaseClient.from("users")
      .select()
      .eq("techno_id", id)
      .then((data) => {
        setUser(data.data[0]);
        setLoading(false);
      });
  }
  useEffect(() => {
    if (id) fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  if (loading) return <Loader />;
  if (!user) return <Error />;
  return (
    <>
      <CustomTitle title={user.name} />
      <div className={styles.user_profile_container}>
        <div className={styles.user_profile_logo}>
          <Image src={logo} alt="" />
        </div>
        <div className={styles.user_profile_card_container}>
          <div className={styles.user_profile_image_container}>
            <img
              src={
                user.image
                  ? user.image
                  : "https://people.com/thmb/JGjxumyykHNuBoeyuELz33P2uHY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(719x309:721x311)/rick-astley-recreation-never-gonna-give-you-up-081922-1-909d277568c34a599c27fa7503ce7a4c.jpg"
              }
              alt=""
            />
          </div>
          <div className={styles.user_profile_name}>{user.name}</div>
          <div className={styles.user_profile_designation}>
            {user.designation}
          </div>
          <div className={styles.user_profile_about}>{user.bio}</div>
          {user.email &&
            !view&&(
              <div
                className={styles.user_profile_email_button}
                onClick={() => setView(!view)}
              >
                View Email
              </div>
            )}
          {view && (
            <div className={styles.user_profile_email}>{user.email}</div>
          )}

          <div className={styles.user_profile_social_icons}>
            {user.twitter && (
              <FaTwitter
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.open(user.twitter, "_blank");
                }}
              />
            )}
            {user.instagram && (
              <FaInstagram
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.open(user.instagram, "_blank");
                }}
              />
            )}
            {user.portfolio && (
              <FiGlobe
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.open(user.portfolio, "_blank");
                }}
              />
            )}
            {user.linkedin && (
              <FaLinkedinIn
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.open(user.linkedin, "_blank");
                }}
              />
            )}
            {user.github && (
              <FaGithub
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.open(user.github, "_blank");
                }}
              />
            )}
            {user.dev && (
              <FaDev
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.open(user.dev, "_blank");
                }}
              />
            )}
          </div>
        </div>
        <div
          className={styles.users_button}
          onClick={() => router.push("/users")}
        >
          View All Users
        </div>
      </div>
    </>
  );
};

export default UserProfile;
