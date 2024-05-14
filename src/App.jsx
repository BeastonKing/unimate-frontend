import "react-image-crop/dist/ReactCrop.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import ExaminationResult from "./pages/Examination/ExaminationResult";
import ExaminationOverview from "./pages/Examination/ExaminationOverview";
import { Suspense, lazy, useEffect } from "react"; // Import Suspense dan lazy
import PurchaseSummary from "./pages/Purchase/PurchaseSummary";
import SideNavAdminResp from "./components/navbar/SideNavAdminResp";
import Loader from "./components/loader/Loader";

const DetailKelas = lazy(() => import("./pages/Class/ClassDetailPage"));
const TopLevelDashboard = lazy(() =>
  import("./pages/Dashboard/TopLevelDashboard")
);
const CsDashboard = lazy(() => import("./pages/Purchase/CsDashboard"));
const AddKelas = lazy(() => import("./pages/Class/AddClass"));
const ManagementClassAdmin = lazy(() =>
  import("./pages/Management/ManagementClassAdmin")
);
const ManagementClassTeacher = lazy(() =>
  import("./pages/Management/ManagementClassTeacher")
);
const EditKelas = lazy(() => import("./pages/Class/EditClass"));

const Main = lazy(() => import("./routes/Main"));

const StatusSummaryGraph = lazy(() =>
  import("./components/graph/StatusSummaryGraph")
);
const PartnershipDailyRatency = lazy(() =>
  import("./components/graph/PartnershipDailyRatency")
);

const TrackingNilai = lazy(() => import("./pages/TrackingNilai/TrackingNilai"));

const TrackingNilaiMurid = lazy(() =>
  import("./pages/TrackingNilai/TrackingNilaiMurid")
);

// Pengumuman
const Announcements = lazy(() => import("./pages/Announcement/Announcements"));
const CreateAnnouncement = lazy(() =>
  import("./pages/Announcement/CreateAnnouncement")
);
const UpdateAnnouncement = lazy(() =>
  import("./pages/Announcement/UpdateAnnouncement")
);

// Protected Configuration
const ProtectedRoutesTeacher = lazy(() =>
  import("./routes/ProtectedRoutesTeacher")
);
const ProtectedRoutesCs = lazy(() => import("./routes/ProtectedRoutesCs"));
const ProtectedRoutesUser = lazy(() => import("./routes/ProtectedRoutesUser"));
const ProtectedRoutesAdmin = lazy(() =>
  import("./routes/ProtectedRoutesAdmin")
);
const ProtectedRoutesTopLevel = lazy(() =>
  import("./routes/ProtectedRoutesTopLevel")
);

// Dashboard
const DashboardCs = lazy(() => import("./pages/Dashboard/DashboardCs"));
const DashboardStudent = lazy(() => import("./pages/Dashboard/Dashboard"));
const DashboardAdmin = lazy(() => import("./pages/Dashboard/DashboardAdmin"));
const DashboardTeacher = lazy(() =>
  import("./pages/Dashboard/DashboardTeacher")
);

// Management
const PartnershipManagement = lazy(() =>
  import("./pages/Partnership/PartnershipManagement")
);

const ManagementBlog = lazy(() => import("./pages/Management/ManagementBlog"));
const ManagementScholarship = lazy(() =>
  import("./pages/Management/ManagementScholarship")
);

// Public Access
const Navbar = lazy(() => import("./components/navbar/Navbar"));
const UnAuthentication = lazy(() => import("./utils/UnAuthentication"));
const NotFound = lazy(() => import("./pages/Error/NotFound"));
const Login = lazy(() => import("./pages/Login/LoginPage"));
const SignUp = lazy(() => import("./pages/Register/RegisterPage"));
const LandingPage = lazy(() => import("./pages/Landing/LandingPage"));
const ForgetPassword = lazy(() =>
  import("./pages/ForgetPassword/ForgetPassword")
);
const ResetPassword = lazy(() =>
  import("./pages/ForgetPassword/ResetPassword")
);
const DetailBlogPage = lazy(() => import("./pages/Blog/DetailBlogPage"));
const PartneshipPage = lazy(() =>
  import("./pages/Partnership/PartnershipPage")
);
const InfoBeasiswaPage = lazy(() => import("./pages/Blog/InfoBeasiswa"));
const PekerjaanLuarNegeriPage = lazy(() =>
  import("./pages/Blog/PekerjaanLuarNegeri")
);
const TipsTrikPage = lazy(() => import("./pages/Blog/TipsTrik"));
const Footer = lazy(() => import("./components/footer/Footer"));
const CalanderPage = lazy(() =>
  import("./pages/ScholarshipCalendar/CalendarPage")
);
const CreateScholarshipPage = lazy(() =>
  import("./pages/ScholarshipCalendar/CreateScholarshipPage")
);
const DetailScholarshipPage = lazy(() =>
  import("./pages/ScholarshipCalendar/DetailScholarshipPage")
);
const UpdateScholarshipPage = lazy(() =>
  import("./pages/ScholarshipCalendar/UpdateScholarshipPage")
);

// Auth Access

const Authentication = lazy(() => import("./utils/Authtentication"));
const Examination = lazy(() => import("./pages/Examination/Examination"));
const SettingAccount = lazy(() => import("./pages/Profile/SettingAccount"));
const EditProfile = lazy(() => import("./pages/Profile/EditProfile"));
const EditPassword = lazy(() => import("./pages/Profile/EditPassword"));
const EditEmail = lazy(() => import("./pages/Profile/EditEmail"));
const DetailProfile = lazy(() => import("./pages/Profile/DetailProfile"));
const EnrolledProgram = lazy(() => import("./pages/Profile/EnrolledProgram"));
const PurchaseHistory = lazy(() => import("./pages/Purchase/PurchaseHistory"));
const Program = lazy(() => import("./pages/Program/Program"));

// Teacher Authorization
const AddExamForm = lazy(() => import("./pages/Examination/AddExamForm"));
const ListExam = lazy(() => import("./pages/Examination/ListExam"));
const AddQuestionForm = lazy(() =>
  import("./pages/Examination/AddQuestionForm")
);
const CreateExam = lazy(() => import("./pages/Examination/CreateExam"));
const SuccessCreateExam = lazy(() =>
  import("./pages/Examination/SuccessCreateExam")
);

// Admin Authorization
const BlogPage = lazy(() => import("./pages/Blog/BlogPage"));
const CreateBlogPage = lazy(() => import("./pages/Blog/CreateBlog"));
const UpdateBlogPage = lazy(() => import("./pages/Blog/UpdateBlog"));
const UserOverview = lazy(() => import("./pages/Management/ManagementUser"));
const UserCreate = lazy(() => import("./pages/User/UserCreate"));
const UserEdit = lazy(() => import("./pages/User/UserEdit"));

// Cs Authorization

// Top Level Authorization

function App() {
  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = import.meta.env.REACT_APP_CLIENT_KEY;
    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader loading={true} />}>
        <Routes>
          <Route path="sidenavtesting" element={<SideNavAdminResp />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="program">
            <Route index element={<Program />} />
            <Route path=":type" element={<Program />} />
          </Route>
          <Route path="blog" element={<BlogPage />} />
          <Route element={<Main />}>
            {/* Tambahkan Suspense untuk wrapping Routes */}

            <Route path="*" element={<NotFound />} />

            <Route path="/" element={<LandingPage />} />

            <Route element={<UnAuthentication />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
            <Route path="course/:id" element={<DetailKelas />} />
            <Route path="calander" element={<CalanderPage />} />

            <Route path="calendar" element={<CalanderPage />} />
            <Route
              path="detail-scholarship/:id"
              element={<DetailScholarshipPage />}
            />

            <Route path="detail-blog/:id" element={<DetailBlogPage />} />
            <Route path="info-beasiswa" element={<InfoBeasiswaPage />} />
            <Route
              path="pekerjaan-luar-negeri"
              element={<PekerjaanLuarNegeriPage />}
            />
            <Route path="tips-trik" element={<TipsTrikPage />} />
            <Route path="partnership" element={<PartneshipPage />} />
            <Route path="forget-password" element={<ForgetPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />

            {/* User Services*/}
            <Route element={<Authentication />}>
              {/* User Services */}
              <Route
                path="examination/:id"
                element={<ExaminationOverview />}
              ></Route>
              <Route
                path="examination/:id/do"
                element={<Examination />}
              ></Route>
              <Route
                path="examination/result/:id"
                element={<ExaminationResult />}
              ></Route>

              {/* <Route path="tracking-score" element={<TrackingNilai />} />
              <Route
                path="tracking-score-teacher"
                element={<TrackingNilaiMurid />}
              /> */}

              <Route element={<ProtectedRoutesUser />}>
                <Route path="profile" element={<DetailProfile />} />

                <Route path="dashboard" element={<DashboardStudent />} />
                <Route path="enrolled-program" element={<EnrolledProgram />} />
                <Route path="purchase-history" element={<PurchaseHistory />} />

                <Route path="settings" element={<SettingAccount />}>
                  <Route index element={<EditProfile />} />
                  <Route path="password" element={<EditPassword />} />
                  <Route path="email" element={<EditEmail />} />
                </Route>

                {/* <Route path="tracking-nilai" element={<TrackingNilai />} /> */}
              </Route>

              {/* Admin Services */}
              <Route path="admin" element={<ProtectedRoutesAdmin />}>
                <Route path="profile" element={<DetailProfile />} />
                <Route path="dashboard" element={<DashboardAdmin />} />
                <Route path="user-management" element={<UserOverview />} />
                <Route path="user-create" element={<UserCreate />} />
                <Route path="user-edit/:id" element={<UserEdit />} />
                <Route
                  path="class-management"
                  element={<ManagementClassAdmin />}
                />
                <Route path="update-class/:id" element={<EditKelas />} />
                <Route path="class-management/add" element={<AddKelas />} />
                <Route path="blog-management" element={<ManagementBlog />} />
                <Route path="create-blog" element={<CreateBlogPage />} />
                <Route path="update-blog/:id" element={<UpdateBlogPage />} />
                <Route
                  path="scholarship-management"
                  element={<ManagementScholarship />}
                />
                <Route
                  path="create-scholarship"
                  element={<CreateScholarshipPage />}
                />
                <Route
                  path="update-scholarship/:id"
                  element={<UpdateScholarshipPage />}
                />
                <Route path="settings" element={<SettingAccount />}>
                  <Route index element={<EditProfile />} />
                  <Route path="password" element={<EditPassword />} />
                  <Route path="email" element={<EditEmail />} />
                </Route>
              </Route>

              {/* Teacher Services */}
              <Route path="teacher" element={<ProtectedRoutesTeacher />}>
                <Route path="profile" element={<DetailProfile />} />
                <Route path="dashboard" element={<DashboardTeacher />} />
                <Route path="user-management" element={<UserOverview />} />
                <Route path="user-create" element={<UserCreate />} />
                <Route path="user-edit" element={<UserEdit />} />
                <Route
                  path="class-management"
                  element={<ManagementClassTeacher />}
                />

                <Route
                  path="class-management/announcements/:id"
                  element={<Announcements />}
                />
                <Route
                  path="class-management/announcements/:id/edit/:idPengumuman"
                  element={<UpdateAnnouncement />}
                />
                <Route
                  path="class-management/announcements/:id/create"
                  element={<CreateAnnouncement />}
                />
                <Route path="add-exam" element={<AddExamForm />} />
                <Route path="settings" element={<SettingAccount />}>
                  <Route index element={<EditProfile />} />
                  <Route path="password" element={<EditPassword />} />
                  <Route path="email" element={<EditEmail />} />
                </Route>

                <Route path="examination">
                  <Route index element={<ListExam />} />
                  <Route
                    path="success-create-exam"
                    element={<SuccessCreateExam />}
                  />
                  <Route element={<CreateExam />}>
                    <Route path="add-exam" element={<AddExamForm />} />
                    <Route path="detail-exam" element={<AddQuestionForm />} />
                  </Route>
                  <Route
                    path="tracking-score/:id"
                    element={<TrackingNilai />}
                  />
                </Route>
              </Route>

              {/* Customer Services */}
              <Route path="customer-service" element={<ProtectedRoutesCs />}>
                <Route path="profile" element={<DetailProfile />} />
                <Route path="dashboard" element={<DashboardCs />}>
                  <Route index element={<PartnershipDailyRatency />} />
                  <Route
                    path="status-partnership-graph"
                    element={<StatusSummaryGraph />}
                  />
                </Route>
                <Route path="purchase-management" element={<CsDashboard />} />
                <Route path="settings" element={<SettingAccount />}>
                  <Route index element={<EditProfile />} />
                  <Route path="password" element={<EditPassword />} />
                  <Route path="email" element={<EditEmail />} />
                </Route>

                <Route
                  path="partnership-management"
                  element={<PartnershipManagement />}
                />
              </Route>

              {/* Top Level Services */}
              <Route path="top-level" element={<ProtectedRoutesTopLevel />}>
                <Route path="profile" element={<DetailProfile />} />

                <Route path="income-summary" element={<PurchaseSummary />} />
                <Route path="dashboard" element={<TopLevelDashboard />} />
                <Route path="settings" element={<SettingAccount />}>
                  <Route index element={<EditProfile />} />
                  <Route path="password" element={<EditPassword />} />
                  <Route path="email" element={<EditEmail />} />
                </Route>

                {/* Lanjutkan @Al */}

                <Route path="income-summary" />
              </Route>

              <Route path="teacher" element={<ProtectedRoutesTeacher />}>
                <Route path="profile" element={<DetailProfile />} />
                <Route path="dashboard" element={<DashboardAdmin />} />

                <Route
                  path="class-management"
                  element={<ManagementClassTeacher />}
                />

                <Route path="examination">
                  <Route index element={<ListExam />} />
                  <Route
                    path="success-create-exam"
                    element={<SuccessCreateExam />}
                  />
                  <Route element={<CreateExam />}>
                    <Route path="add-exam" element={<AddExamForm />} />
                    <Route path="detail-exam" element={<AddQuestionForm />} />
                  </Route>
                </Route>

                <Route path="settings" element={<SettingAccount />}>
                  <Route index element={<EditProfile />} />
                  <Route path="password" element={<EditPassword />} />
                  <Route path="email" element={<EditEmail />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}

export default App;
