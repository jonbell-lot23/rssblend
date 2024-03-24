import React from "react";
import styles from "../styles/v0.module.css";

const Firehose = () => {
  return (
    <div className={styles.firehose}>
      <div className={styles.sidebar}>{/* Content for the left graphic */}</div>
      <div className={styles.content}>
        <div className={styles.masthead}>
          <div className={styles.headerContent}>
            <h1>Firehose</h1>
            <p>
              A simple tool for combining a bunch of different feeds into a
              single one, so you can follow your favourite internet artists and
              writers more easily. Like if Linktree wasn’t weak sauce.
            </p>
          </div>
        </div>
        <div className={styles.learnMore}>
          <div className={styles.column}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <svg
                width="28"
                height="29"
                viewBox="0 0 28 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.9936 28.5C12.0756 28.5 10.2706 28.1354 8.57834 27.406C6.8861 26.6768 5.39781 25.6696 4.11344 24.3847C2.82907 23.0997 1.82241 21.6151 1.09345 19.9306C0.364482 18.2377 0 16.4274 0 14.5C0 12.5726 0.364482 10.7667 1.09345 9.08232C1.82241 7.38929 2.82907 5.90031 4.11344 4.61535C5.39781 3.32171 6.8861 2.31458 8.57834 1.59395C10.2706 0.864651 12.0756 0.5 13.9936 0.5C15.92 0.5 17.7294 0.864651 19.4217 1.59395C21.1139 2.31458 22.6023 3.32171 23.8866 4.61535C25.171 5.90031 26.1776 7.38929 26.9066 9.08232C27.6355 10.7667 28 12.5726 28 14.5C28 16.4274 27.6355 18.2377 26.9066 19.9306C26.1776 21.6151 25.171 23.0997 23.8866 24.3847C22.6023 25.6696 21.1139 26.6768 19.4217 27.406C17.7294 28.1354 15.92 28.5 13.9936 28.5ZM10.3747 9.14743C9.72386 9.14743 9.09903 9.29069 8.50024 9.5772C7.90145 9.85503 7.48056 10.2153 7.23757 10.6581C7.15947 10.7623 7.11174 10.8622 7.09438 10.9577C7.07703 11.0532 7.06835 11.1877 7.06835 11.3614V19.0321C7.06835 19.5703 7.33303 19.8395 7.8624 19.8395C8.00992 19.8395 8.1401 19.8178 8.25291 19.7744C8.37441 19.731 8.51759 19.6572 8.68248 19.553C9.31598 19.1276 10.0189 18.9149 10.7913 18.9149C11.1731 18.9149 11.5419 18.9757 11.8977 19.0971C12.2623 19.2187 12.6051 19.4054 12.9261 19.6572C13.0042 19.744 13.0954 19.7874 13.1994 19.7874C13.3991 19.7874 13.4988 19.6919 13.4988 19.5009V10.9186C13.4988 10.7884 13.4512 10.6495 13.3556 10.5019C13.0954 10.0938 12.6961 9.76821 12.1581 9.52511C11.62 9.27333 11.0256 9.14743 10.3747 9.14743ZM17.6253 9.14743C16.9832 9.14743 16.3887 9.27333 15.8419 9.52511C15.3039 9.76821 14.9048 10.0938 14.6444 10.5019C14.549 10.6495 14.5012 10.7884 14.5012 10.9186V19.5009C14.5012 19.6919 14.6009 19.7874 14.8006 19.7874C14.8961 19.7874 14.9872 19.744 15.0739 19.6572C15.3951 19.4054 15.7379 19.2187 16.1023 19.0971C16.4668 18.9757 16.8355 18.9149 17.2088 18.9149C17.9811 18.9149 18.684 19.1276 19.3175 19.553C19.4911 19.6572 19.63 19.731 19.7341 19.7744C19.8469 19.8178 19.9858 19.8395 20.1506 19.8395C20.6714 19.8395 20.9316 19.5703 20.9316 19.0321V11.3614C20.9316 11.1877 20.9186 11.0532 20.8926 10.9577C20.8753 10.8622 20.8362 10.7623 20.7755 10.6581C20.5151 10.2153 20.0855 9.85503 19.4868 9.5772C18.888 9.29069 18.2675 9.14743 17.6253 9.14743Z"
                  fill="#F6F1DC"
                />
              </svg>
              <h2>Read up</h2>
            </div>
            <p>
              The concept is explained more in the article "Hey creators, please
              make firehoses!" →
            </p>
          </div>
          <div className={styles.column}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <svg
                width="28"
                height="29"
                viewBox="0 0 28 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.9935 28.5C12.0756 28.5 10.2706 28.1354 8.57833 27.406C6.88609 26.6768 5.3978 25.6696 4.11344 24.3847C2.82907 23.0997 1.82241 21.6151 1.09345 19.9307C0.364481 18.2376 0 16.4274 0 14.5001C0 12.5726 0.364481 10.7667 1.09345 9.08233C1.82241 7.3893 2.82907 5.90031 4.11344 4.61535C5.3978 3.32171 6.88609 2.31458 8.57833 1.59395C10.2706 0.864652 12.0756 0.5 13.9935 0.5C15.9201 0.5 17.7294 0.864652 19.4216 1.59395C21.1138 2.31458 22.6022 3.32171 23.8865 4.61535C25.1709 5.90031 26.1775 7.3893 26.9065 9.08233C27.6354 10.7667 28 12.5726 28 14.5001C28 16.4274 27.6354 18.2376 26.9065 19.9307C26.1775 21.6151 25.1709 23.0997 23.8865 24.3847C22.6022 25.6696 21.1138 26.6768 19.4216 27.406C17.7294 28.1354 15.9201 28.5 13.9935 28.5ZM13.9935 19.9827C15.0522 19.9827 16.0241 19.8352 16.9093 19.54C17.8032 19.2448 18.5972 18.8714 19.2914 18.42C19.9944 17.9598 20.5932 17.4779 21.0878 16.9744C21.5825 16.4622 21.96 15.9847 22.2203 15.5419C22.4807 15.0904 22.6108 14.7388 22.6108 14.4869C22.6108 14.2352 22.4807 13.8879 22.2203 13.4451C21.96 13.0023 21.5825 12.5291 21.0878 12.0256C20.5932 11.5133 19.9944 11.0315 19.2914 10.58C18.5972 10.1198 17.8032 9.74217 16.9093 9.44698C16.0241 9.15178 15.0522 9.00419 13.9935 9.00419C12.9521 9.00419 11.9845 9.15178 11.0906 9.44698C10.2055 9.74217 9.41143 10.1198 8.70849 10.58C8.00557 11.0315 7.40243 11.5133 6.89911 12.0256C6.40446 12.5291 6.02695 13.0023 5.76662 13.4451C5.50627 13.8879 5.37609 14.2352 5.37609 14.4869C5.37609 14.7388 5.50627 15.0904 5.76662 15.5419C6.02695 15.9847 6.40446 16.4622 6.89911 16.9744C7.40243 17.4779 8.00557 17.9598 8.70849 18.42C9.41143 18.8714 10.2055 19.2448 11.0906 19.54C11.9845 19.8352 12.9521 19.9827 13.9935 19.9827ZM13.9935 17.9381C13.36 17.9381 12.7828 17.7819 12.2622 17.4693C11.7415 17.1568 11.3206 16.74 10.9995 16.219C10.6871 15.6895 10.5309 15.1164 10.5309 14.5001C10.5309 13.8662 10.6871 13.2888 10.9995 12.768C11.3206 12.2383 11.7415 11.8216 12.2622 11.5177C12.7828 11.2051 13.36 11.0488 13.9935 11.0488C14.627 11.0488 15.204 11.2051 15.7248 11.5177C16.2541 11.8216 16.675 12.2383 16.9874 12.768C17.2998 13.2888 17.4561 13.8662 17.4561 14.5001C17.4561 15.1164 17.2998 15.6895 16.9874 16.219C16.675 16.74 16.2541 17.1568 15.7248 17.4693C15.204 17.7819 14.627 17.9381 13.9935 17.9381ZM13.9935 15.9847C14.41 15.9847 14.7658 15.8414 15.0609 15.5549C15.3559 15.2596 15.5035 14.908 15.5035 14.5001C15.5035 14.092 15.3559 13.7404 15.0609 13.4451C14.7658 13.1499 14.41 13.0023 13.9935 13.0023C13.5769 13.0023 13.2211 13.1499 12.926 13.4451C12.6396 13.7404 12.4965 14.092 12.4965 14.5001C12.4965 14.908 12.6396 15.2596 12.926 15.5549C13.2211 15.8414 13.5769 15.9847 13.9935 15.9847Z"
                  fill="#F6F1DC"
                />
              </svg>

              <h2>Follow along</h2>
            </div>
            <p>
              Firehose is currently a personal project for me, Jon Bell. I'll
              provide a link soon.
            </p>
          </div>
          <div className={styles.column}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <svg
                width="28"
                height="29"
                viewBox="0 0 28 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.9936 28.5C12.0757 28.5 10.2706 28.1353 8.57834 27.406C6.8861 26.6767 5.39781 25.6696 4.11344 24.3846C2.82907 23.0997 1.82241 21.615 1.09345 19.9306C0.364482 18.2377 0 16.4274 0 14.5C0 12.5725 0.364482 10.7666 1.09345 9.08232C1.82241 7.38929 2.82907 5.9003 4.11344 4.61534C5.39781 3.3217 6.8861 2.31457 8.57834 1.59395C10.2706 0.864651 12.0757 0.5 13.9936 0.5C15.92 0.5 17.7294 0.864651 19.4217 1.59395C21.1139 2.31457 22.6023 3.3217 23.8866 4.61534C25.171 5.9003 26.1776 7.38929 26.9066 9.08232C27.6355 10.7666 28 12.5725 28 14.5C28 16.4274 27.6355 18.2377 26.9066 19.9306C26.1776 21.615 25.171 23.0997 23.8866 24.3846C22.6023 25.6696 21.1139 26.6767 19.4217 27.406C17.7294 28.1353 15.92 28.5 13.9936 28.5ZM10.8694 8.75673C10.1664 8.75673 9.5286 8.92603 8.95584 9.26464C8.39176 9.60324 7.9405 10.0808 7.60205 10.6972C7.26361 11.3049 7.09438 12.0169 7.09438 12.833C7.09438 13.6752 7.25927 14.4696 7.58904 15.2162C7.92748 15.9542 8.35705 16.6358 8.87774 17.2609C9.39843 17.8774 9.94081 18.4287 10.5049 18.9149C11.0777 19.3923 11.6027 19.7961 12.08 20.126C12.5573 20.4473 12.9174 20.6773 13.1605 20.8163C13.2819 20.8857 13.4207 20.9595 13.577 21.0376C13.7332 21.1071 13.8764 21.1419 14.0066 21.1419C14.128 21.1419 14.2625 21.1071 14.4101 21.0376C14.5576 20.9595 14.6965 20.8857 14.8267 20.8163C15.0696 20.686 15.4297 20.4603 15.907 20.139C16.3843 19.8091 16.905 19.4054 17.4692 18.9279C18.0332 18.4417 18.5756 17.886 19.0963 17.2609C19.617 16.6358 20.0422 15.9542 20.3719 15.2162C20.7104 14.4696 20.8796 13.6752 20.8796 12.833C20.8796 12.0169 20.7104 11.3049 20.3719 10.6972C20.0335 10.0808 19.5779 9.60324 19.0052 9.26464C18.4411 8.92603 17.8075 8.75673 17.1046 8.75673C16.3496 8.75673 15.7074 8.9434 15.1781 9.31672C14.6574 9.69006 14.2625 10.1111 13.9936 10.58C13.7159 10.1111 13.3123 9.69006 12.7829 9.31672C12.2623 8.9434 11.6243 8.75673 10.8694 8.75673Z"
                  fill="#F6F1DC"
                />
              </svg>

              <h2>Share the love</h2>
            </div>
            <p>
              If you think this is a fun concept, I'd love to hear from you!
              Send me an email at jb@lot23.com and make my day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Firehose;
