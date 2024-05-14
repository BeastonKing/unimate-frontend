import React from "react";
import adv from "../../assets/image/adv-landing.png";

const Advantages = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="mt-20 w-2/3 text-center">
          <div className="">KEUNGGULAN UNIMATE</div>
          <div className="text-5xl my-5 font-semibold text-main-400 ">
            Mengapa Harus Unimate?
          </div>
          <div className="mx-20">
            Kami menawarkan layanan yang berkualitas tinggi, konsultas & mentor
            yang berpendidikan, dan tim yang berpengalaman.
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-10 mx-20 my-10">
        <div
          id="card"
          className="shadow-lg rounded-lg hover:-translate-y-1 hover:scale-105 hover:shadow-lg duration-300"
        >
          <div className="m-5 flex flex-col justify-between">
            <div className="bg-gradient-to-tl from-main-200 via-main-200 to-main-10 flex justify-center items-center w-12 h-12 rounded-lg">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.0001 11.15L16.0001 9.22998L15.0601 11.15C14.988 11.2968 14.8811 11.4237 14.7486 11.5196C14.6161 11.6155 14.4621 11.6774 14.3001 11.7L12.1901 12L13.7201 13.5C13.8358 13.6124 13.9226 13.7511 13.9731 13.9044C14.0236 14.0576 14.0363 14.2208 14.0101 14.38L13.6401 16.49L15.5401 15.49C15.6804 15.4108 15.8389 15.3695 16.0001 15.37C16.1642 15.3708 16.3256 15.412 16.4701 15.49L18.3601 16.49L18.0001 14.38C17.9738 14.2208 17.9865 14.0576 18.037 13.9044C18.0875 13.7511 18.1743 13.6124 18.2901 13.5L19.8501 12L17.7301 11.7C17.5734 11.6729 17.4255 11.6089 17.2986 11.5133C17.1716 11.4176 17.0693 11.2931 17.0001 11.15Z"
                  fill="white"
                />
                <path
                  d="M16 2C13.0826 2 10.2847 3.15893 8.22184 5.22183C6.15894 7.28473 5.00001 10.0826 5.00001 13V29C4.9992 29.1519 5.03299 29.302 5.09883 29.4389C5.16468 29.5757 5.26084 29.6958 5.38001 29.79C5.5002 29.8835 5.64015 29.9483 5.78919 29.9795C5.93823 30.0107 6.09242 30.0075 6.24001 29.97L15 27.76V24C15 23.7348 15.1054 23.4804 15.2929 23.2929C15.4804 23.1054 15.7348 23 16 23C16.2652 23 16.5196 23.1054 16.7071 23.2929C16.8947 23.4804 17 23.7348 17 24V27.81L25.76 30C25.8397 30.0096 25.9203 30.0096 26 30C26.2652 30 26.5196 29.8946 26.7071 29.7071C26.8947 29.5196 27 29.2652 27 29V13C27 10.0826 25.8411 7.28473 23.7782 5.22183C21.7153 3.15893 18.9174 2 16 2ZM22.7 12L20.09 14.54L20.71 18.13C20.7457 18.3175 20.727 18.5113 20.6561 18.6885C20.5853 18.8656 20.4652 19.0189 20.31 19.13C20.1367 19.2507 19.9312 19.3169 19.72 19.32C19.5589 19.3205 19.4004 19.2792 19.26 19.2L16 17.51L12.81 19.2C12.6458 19.2871 12.4605 19.3267 12.2751 19.3143C12.0896 19.3019 11.9112 19.2381 11.76 19.13C11.6049 19.0189 11.4848 18.8656 11.4139 18.6885C11.343 18.5113 11.3243 18.3175 11.36 18.13L12 14.56L9.37001 12C9.24147 11.8717 9.15029 11.7109 9.10624 11.5347C9.0622 11.3585 9.06696 11.1737 9.12001 11C9.17721 10.8236 9.28232 10.6666 9.42359 10.5466C9.56486 10.4265 9.73674 10.348 9.92001 10.32L13.53 9.79L15.14 6.53C15.223 6.36359 15.3506 6.2236 15.5087 6.12575C15.6668 6.0279 15.8491 5.97607 16.035 5.97607C16.2209 5.97607 16.4032 6.0279 16.5613 6.12575C16.7194 6.2236 16.8471 6.36359 16.93 6.53L18.54 9.79L22.14 10.32C22.32 10.3493 22.4885 10.4273 22.6274 10.5456C22.7662 10.6638 22.8701 10.8177 22.9278 10.9907C22.9855 11.1637 22.9947 11.3492 22.9546 11.5271C22.9144 11.705 22.8264 11.8685 22.7 12Z"
                  fill="white"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-main-100 my-2">
              Layanan Berkualitas
            </h3>
            <p>
              Keunggulan utama Unimate adalah komitmen terhadap layanan
              berkualitas tinggi.
            </p>
          </div>
        </div>

        <div
          id="card"
          className="shadow-lg rounded-lg hover:-translate-y-1 hover:scale-105 hover:shadow-lg duration-300"
        >
          <div className="m-5 flex flex-col justify-between">
            <div className="bg-gradient-to-tl from-main-200 via-main-200 to-main-10 flex justify-center items-center w-12 h-12 rounded-lg">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M29.7804 28.3805L25.7804 23.3805C25.6644 23.2326 25.5091 23.1203 25.3322 23.0567C25.1553 22.993 24.9641 22.9804 24.7804 23.0205L16.0004 25.0005L7.22041 23.0005C7.03674 22.9604 6.8455 22.973 6.66863 23.0367C6.49175 23.1003 6.33641 23.2126 6.22041 23.3605L2.22041 28.3605C2.10434 28.5068 2.03158 28.6828 2.01037 28.8684C1.98917 29.0539 2.02036 29.2417 2.10041 29.4105C2.17857 29.5844 2.30482 29.7324 2.46428 29.8369C2.62374 29.9414 2.80976 29.9982 3.00041 30.0005H29.0004C29.1889 30 29.3734 29.9462 29.5326 29.8453C29.6919 29.7445 29.8194 29.6007 29.9004 29.4305C29.9805 29.2617 30.0117 29.0739 29.9904 28.8884C29.9692 28.7028 29.8965 28.5268 29.7804 28.3805Z"
                  fill="white"
                />
                <path
                  d="M2.52118 7.86039L15.8712 11.6204L29.6512 7.75039C29.7597 7.65761 29.847 7.54267 29.9074 7.4133C29.9678 7.28394 29.9998 7.14314 30.0012 7.00039C30.0107 6.77854 29.946 6.55984 29.8175 6.37877C29.6889 6.19771 29.5038 6.06459 29.2912 6.00039L16.2912 2.00039C16.1011 1.95039 15.9013 1.95039 15.7112 2.00039L2.71118 6.00039C2.5266 6.05981 2.36327 6.17161 2.24108 6.32218C2.11889 6.47275 2.04312 6.6556 2.02298 6.84847C2.00285 7.04133 2.03922 7.23589 2.12768 7.40845C2.21613 7.58101 2.35285 7.72414 2.52118 7.82039V7.86039Z"
                  fill="white"
                />
                <path
                  d="M16.14 13.6208C15.964 13.6742 15.776 13.6742 15.6 13.6208L8.5 11.6208V16.2808C8.50264 18.0224 9.19569 19.692 10.4272 20.9236C11.6588 22.1551 13.3283 22.8481 15.07 22.8508H16.93C18.6717 22.8481 20.3412 22.1551 21.5728 20.9236C22.8043 19.692 23.4974 18.0224 23.5 16.2808V11.5508L16.14 13.6208Z"
                  fill="white"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-main-100 my-2">
              Konsultan Berpendidikan
            </h3>
            <p>
              Konsultan dan Mentor Unimate memiliki pengetahuan dan wawasan
              bidang internasional.
            </p>
          </div>
        </div>

        <div
          id="card"
          className="shadow-lg rounded-lg hover:-translate-y-1 hover:scale-105 hover:shadow-lg duration-300"
        >
          <div className="m-5 flex flex-col justify-between">
            <div className="bg-gradient-to-tl from-main-200 via-main-200 to-main-10 flex justify-center items-center w-12 h-12 rounded-lg">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 17C9.55228 17 10 16.5523 10 16C10 15.4477 9.55228 15 9 15C8.44772 15 8 15.4477 8 16C8 16.5523 8.44772 17 9 17Z"
                  fill="white"
                />
                <path
                  d="M16 16C16.5523 16 17 15.5523 17 15C17 14.4477 16.5523 14 16 14C15.4477 14 15 14.4477 15 15C15 15.5523 15.4477 16 16 16Z"
                  fill="white"
                />
                <path
                  d="M27.0004 8H26.5904L24.9004 4.56C24.818 4.3917 24.6899 4.24996 24.5307 4.15094C24.3716 4.05193 24.1878 3.99963 24.0004 4C23.8168 3.99962 23.6366 4.04981 23.4796 4.14506C23.3226 4.24031 23.1949 4.37695 23.1104 4.54L21.3304 8H5.00042C4.18967 8.01838 3.41913 8.3568 2.85704 8.94137C2.29496 9.52594 1.987 10.3092 2.00042 11.12V24.88C1.987 25.6908 2.29496 26.4741 2.85704 27.0586C3.41913 27.6432 4.18967 27.9816 5.00042 28H27.0004C27.8112 27.9816 28.5817 27.6432 29.1438 27.0586C29.7059 26.4741 30.0138 25.6908 30.0004 24.88V11.12C30.0138 10.3092 29.7059 9.52594 29.1438 8.94137C28.5817 8.3568 27.8112 8.01838 27.0004 8ZM26.0004 23C26.0004 23.2652 25.8951 23.5196 25.7075 23.7071C25.52 23.8946 25.2656 24 25.0004 24C24.7352 24 24.4809 23.8946 24.2933 23.7071C24.1058 23.5196 24.0004 23.2652 24.0004 23C24.0004 20.83 21.1604 19 17.8004 19H14.2004C10.8404 19 8.00042 20.83 8.00042 23C8.00042 23.2652 7.89506 23.5196 7.70753 23.7071C7.51999 23.8946 7.26564 24 7.00042 24C6.7352 24 6.48085 23.8946 6.29331 23.7071C6.10578 23.5196 6.00042 23.2652 6.00042 23C6.0327 22.1888 6.2516 21.396 6.64009 20.6832C7.02859 19.9704 7.57622 19.3568 8.24042 18.89C7.69755 18.7478 7.20544 18.4562 6.82001 18.0484C6.43457 17.6405 6.17126 17.1327 6.06 16.5827C5.94874 16.0326 5.99398 15.4624 6.19059 14.9368C6.3872 14.4112 6.7273 13.9513 7.17223 13.6093C7.61716 13.2673 8.1491 13.057 8.70759 13.0022C9.26609 12.9474 9.82876 13.0504 10.3317 13.2994C10.8346 13.5484 11.2575 13.9335 11.5525 14.4109C11.8475 14.8883 12.0027 15.4388 12.0004 16C11.9978 16.447 11.8953 16.8877 11.7004 17.29C12.3851 17.1208 13.0856 17.0237 13.7904 17C13.3965 16.5709 13.1361 16.0365 13.0408 15.4619C12.9456 14.8873 13.0196 14.2974 13.2539 13.7642C13.4883 13.231 13.8727 12.7776 14.3605 12.4592C14.8482 12.1408 15.418 11.9712 16.0004 11.9712C16.5829 11.9712 17.1527 12.1408 17.6404 12.4592C18.1281 12.7776 18.5126 13.231 18.7469 13.7642C18.9812 14.2974 19.0553 14.8873 18.96 15.4619C18.8648 16.0365 18.6043 16.5709 18.2104 17C18.9146 17.0171 19.615 17.1076 20.3004 17.27C20.1084 16.8738 20.006 16.4402 20.0004 16C19.9982 15.4388 20.1533 14.8883 20.4483 14.4109C20.7433 13.9335 21.1663 13.5484 21.6692 13.2994C22.1721 13.0504 22.7348 12.9474 23.2932 13.0022C23.8517 13.057 24.3837 13.2673 24.8286 13.6093C25.2735 13.9513 25.6136 14.4112 25.8102 14.9368C26.0069 15.4624 26.0521 16.0326 25.9408 16.5827C25.8296 17.1327 25.5663 17.6405 25.1808 18.0484C24.7954 18.4562 24.3033 18.7478 23.7604 18.89C24.4246 19.3568 24.9723 19.9704 25.3607 20.6832C25.7492 21.396 25.9681 22.1888 26.0004 23Z"
                  fill="white"
                />
                <path
                  d="M23 17C23.5523 17 24 16.5523 24 16C24 15.4477 23.5523 15 23 15C22.4477 15 22 15.4477 22 16C22 16.5523 22.4477 17 23 17Z"
                  fill="white"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-main-100 my-2">
              Tim Berpengalaman
            </h3>
            <p>
              Tim Unimate berpengalaman di maasing-masing bidangnya sehingga
              kualitas layanan pun terbaik.
            </p>
          </div>
        </div>
      </div>

      <div className="flex m-20">
        <div className="w-3/5 flex flex-col justify-center">
          <p>PROGRAM KAMI</p>

          <div className="my-5 text-5xl text-main-400 font-semibold">
            Unimate itu Lain Daripada yang Lain!
          </div>
          <p>Emang uniknya Unimate daripada yang lain itu apa sih?</p>
        </div>
        <div className="hidden lg:flex items-center justify-start max-w-xl mx-auto">
          <div className="min-w-full object-cover text-center">
            {/* Konten di sini */}
            <img src={adv} alt="hallo user" className="w-full h-auto" />
          </div>
        </div>
      </div>

      <div className="flex gap-5 mx-20">
        <div className="p-4 rounded-lg border border-main-10">
          <div className="flex gap-4 mb-5">
            <div className="text-white bg-main-200 flex justify-center items-center text-xl font-semibold w-12 h-12 bg-gradient-to-tl from-main-200 via-main-200 to-main-10 rounded-lg">
              1
            </div>
            <div className="text-xl font-semibold flex justify-center items-center text-main-100">
              Kurikulum Dirancang Khusus
            </div>
          </div>

          <div className="border-b border border-main-200 opacity-10"></div>
          <p className="my-5">
            Unimate menawarkan kurikulum yang dirancang khusus untuk persiapan
            kuliah di luar negeri, persiapan tes, kelas bahasa, dan bimbingan
            persiapan kerja ke luar negeri.
          </p>
        </div>

        <div className="p-4 rounded-lg border border-main-10">
          <div className="flex gap-4 mb-5">
            <div className="text-white bg-main-200 flex justify-center items-center text-xl font-semibold w-12 h-12 bg-gradient-to-tl from-main-200 via-main-200 to-main-10 rounded-lg">
              2
            </div>
            <div className="text-xl font-semibold flex justify-center items-center text-main-100">
              Layanan Unimate Terpadu
            </div>
          </div>

          <div className="border-b border border-main-200 opacity-10"></div>
          <p className="my-5">
            Kami menawarkan pendekatan terpadu yang mencakup segala aspek
            pendidikan dan karir internasional sehingga memudahkanmu untuk
            berjuang meraih mimpi.
          </p>
        </div>
      </div>
    </>
  );
};

export default Advantages;
