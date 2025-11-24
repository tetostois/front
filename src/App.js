import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Course from './pages/Course';
import Dashboard from './pages/Dashboard';
import { AppContext } from './context';
import Module from './pages/Module';
import Apropos from './pages/Apropos';
import Transition from './pages/Transition';
import Cookies from "js-cookie";

// import Header from './composants/Header';
import { userProfile } from './utils/data';
import AdminDashboard from './pages/AdminPages/AdminDashboard';
import Etudiant from './pages/AdminPages/Etudiant';
import ShowEtudiant from './pages/AdminPages/Etudiant/ShowEtudiant';
import Sidebar from './composants/Sidebar';
import './App.css';
import Professeur from './pages/AdminPages/Professeur';
import ShowProfesseur from './pages/AdminPages/Professeur/ShowProfesseur';
import StatEtudiant from './pages/AdminPages/Etudiant/StatEtudiant';
import Error404Page from './pages/404ErrorPage';
import CreateProfesseur from './pages/AdminPages/Professeur/CreateProfesseur';
import AlterProfesseur from './pages/AdminPages/Professeur/AlterProfesseur';
import Rubrique from './pages/AdminPages/Media/Rubrique';
import CreateRubrique from './pages/AdminPages/Media/Rubrique/CreateRubrique';
import ShowRubrique from './pages/AdminPages/Media/Rubrique/ShowRubrique';
import Article from './pages/AdminPages/Media/Article';
import CreateArticle from './pages/AdminPages/Media/Article/CreateArticle';
import ShowArticle from './pages/AdminPages/Media/Article/ShowArticle';
import Media, { MediaWithDefaultIdRubrique } from './pages/Media';
import ArticlePublic from './pages/Media/Article';
import 'typeface-roboto';
import AlterRubrique from './pages/AdminPages/Media/Rubrique/AlterRubrique';
import AlterArticle from './pages/AdminPages/Media/Article/AlterArticle';
import Forum from './pages/AdminPages/Forum';
import StatForum from './pages/AdminPages/Forum/StatForum';
import BonCommandes from './pages/AdminPages/BonCommandes';
import Setting from './pages/AdminPages/Setting';
import Inscription from './pages/Inscription';
import Connexion from './pages/Connexion';
import ModuleAdmin from './pages/AdminPages/ContenuFormation/ModuleAdmin';
import ShowModuleAdmin from './pages/AdminPages/ContenuFormation/ModuleAdmin/ShowModuleAdmin';
import CreateModuleAdmin from './pages/AdminPages/ContenuFormation/ModuleAdmin/CreateModuleAdmin';
import AlterModuleAdmin from './pages/AdminPages/ContenuFormation/ModuleAdmin/AlterModuleAdmin';
import CourAdmin from './pages/AdminPages/ContenuFormation/CourAdmin';
import ShowCourAdmin from './pages/AdminPages/ContenuFormation/CourAdmin/ShowCourAdmin';
import CreateCourAdmin from './pages/AdminPages/ContenuFormation/CourAdmin/CreateCourAdmin';
import AlterCourAdmin from './pages/AdminPages/ContenuFormation/CourAdmin/AletrCourAdmin';
import Inscription002 from './pages/Inscription/inscrption002';
import ValidationInscription from './pages/ValidationPages/ValidationInscription';
import ControlValidationCompteEtudiant from './pages/ValidationPages/ControlValidationCompteEtudiant';
import Home from './pages/Home';
import Apropos02 from './pages/Apropos/Apropos02';
import CreateQCM from './pages/AdminPages/ContenuFormation/CourAdmin/Qcm/CreateQCM';
import ShowQCM from './pages/AdminPages/ContenuFormation/CourAdmin/Qcm/ShowQCM';
import AlterQCM from './pages/AdminPages/ContenuFormation/CourAdmin/Qcm/AlterQCM';
import Mail from './pages/Mail';
import SuccessMailSend from './pages/Mail/SuccessMailSend';
import Header from './composants/Header';
import { ResetPasswordStepOne, ResetPasswordStepTow } from './pages/Connexion/resetPassword';
import Account from './pages/Account';
import { height } from '@mui/system';
import ProfesseurDashboard from './pages/ProfesseurPages/Dashboard';
import ModuleQRO from './pages/ProfesseurPages/ModuleQRO';
//import AlterRubrique from './pages/AdminPages/Media/Rubrique/AlterRubrique';

//const AppContext = createContext();

// Fonction pour initialiser l'utilisateur depuis les cookies
const initializeUserFromCookies = () => {
  const userCookie = Cookies.get("user");
  if (userCookie) {
    try {
      return JSON.parse(userCookie);
    } catch (e) {
      console.error("Erreur lors de la lecture du cookie utilisateur:", e);
      return null;
    }
  }
  return null;
};

function App() {
  const [isOnline, setIsOnline] = useState(true);
  const [language, setLanguage] = useState('FR');
  // Initialiser l'utilisateur directement depuis les cookies
  const [user, setUser] = useState(() => initializeUserFromCookies());
  const [large, setLarge] = useState(false);
  const serveurURL = process.env.REACT_APP_API_URL || "http://localhost:9006/elearningapi";

  // Vérifier périodiquement les cookies pour les mises à jour
  useEffect(() => {
      const intervalId = setInterval(() => checkUserOnCookies(user, setUser), 4000);
      return () => clearInterval(intervalId);
  }, [user, setUser]);

  return (

    <AppContext.Provider value={{ language, setLanguage, user, setUser, isOnline, setIsOnline,serveurURL }}>
      <CheckInternetConnection isOnline={isOnline} setIsOnline={setIsOnline} />

      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        {(user && user.profil !== userProfile.ETUDIANT_USER) &&
          <Sidebar large={large} setLarge={setLarge}  />
        }
        <div className={(large) ? "mainDiv large" : (!user || (user.profil === userProfile.ETUDIANT_USER) ? "mainDiv large" : "mainDiv")}>
          
          <Routes>


            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/home02" element={<Home />}></Route>
            <Route path="/inscription" element={<Inscription002 />}></Route>
            
            <Route path="/registration" element={<Inscription002 />}></Route>
            
            <Route path="/signup" element={<Inscription002 />}></Route>
            <Route path="/connexion" element={<Connexion />}></Route>
            <Route path="/signin" element={<Connexion />}></Route>

            <Route path="/resetpassword" element={<ResetPasswordStepOne />}></Route>
            <Route path="/resetpassword/:codeChangePassword" element={<ResetPasswordStepTow />}></Route>

            <Route path="/validationcompte/:lienConfirmation" element={<ValidationInscription />}></Route>
            <Route path="/controlevalidationcompte/:matricule" element={<ControlValidationCompteEtudiant />}></Route>

            <Route path="/apropos" element={<Apropos02 />}></Route>
            <Route path="/apropos02" element={<Apropos02 />}></Route>
            <Route path="/about" element={<Apropos02 />}></Route>
            <Route path="/transition" element={<Transition />}></Route>



            {(!user || user.profil !== userProfile.ADMIN_USER) &&
            <>
            <Route path="/articles" element={<Media />}></Route>
            <Route path="/medias" element={<Media />}></Route>
            <Route path="/medias/rubrique/:idRubrique" element={<MediaWithDefaultIdRubrique />}></Route>
            <Route path="/medias/rubrique/:nomRubrique/:idRubrique" element={<MediaWithDefaultIdRubrique />}></Route>
            <Route path="/article/:lienArticle" element={<ArticlePublic />}></Route>
            </>
            }
            
            {(user && user.profil === userProfile.ETUDIANT_USER) &&
              <>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/course/:idChapitre" element={<Course />}></Route>
                <Route path="/module/:idModule" element={<Module />}></Route>
                <Route path="/account" element={<Account />}></Route>
              </>  
            }

            {(user && user.profil === userProfile.PROFESSEUR_USER) &&
              <>
                <Route path="/dashboard" element={<ProfesseurDashboard />}></Route>
                <Route path="/professeur/module/:idModule" element={<ModuleQRO />}></Route>
                <Route path="/account" element={<Account />}></Route>
              </>
            }

            {(user && user.profil === userProfile.ADMIN_USER) &&
              <>
                <Route path="/dashboard" element={<AdminDashboard />}></Route>
                <Route path="/etudiants" element={<Etudiant />}></Route>
                <Route path="/statetudiant" element={<StatEtudiant />}></Route>
                <Route path="/etudiant/:matriculeEtudiant" element={<ShowEtudiant />}></Route>

                <Route path="/professeur" element={<Professeur />}></Route>
                <Route path="/professeurs" element={<Professeur />}></Route>
                <Route path="/professeur/ajouter" element={<CreateProfesseur />}></Route>
                <Route path="/professeur/creer" element={<CreateProfesseur />}></Route>
                <Route path="/professeur/alter/:matricule" element={<AlterProfesseur />}></Route>
                <Route path="/professeur/:matricule" element={<ShowProfesseur />}></Route>

                <Route path="/modules" element={<ModuleAdmin />}></Route>
                <Route path="/module/creer" element={<CreateModuleAdmin />}></Route>
                <Route path="/module/ajouter" element={<CreateModuleAdmin />}></Route>
                <Route path="/module/alter/:idModule" element={<AlterModuleAdmin />}></Route>
                <Route path="/module/:idModule" element={<ShowModuleAdmin />}></Route>


                <Route path="/cours" element={<CourAdmin />}></Route>
                <Route path="/cour/ajouter" element={<CreateCourAdmin />}></Route>
                <Route path="/cour/alter/:idChapitre" element={<AlterCourAdmin />}></Route>
                <Route path="/cour/:idChapitre" element={<ShowCourAdmin />}></Route>


                <Route path="/qcm/ajouter/:idChapitre" element={<CreateQCM />}></Route>
                <Route path="/qcm/alter/:idChapitre/:idQcm" element={<AlterQCM />}></Route>
                <Route path="/qcm/:idChapitre/:idQcm" element={<ShowQCM />}></Route>


                <Route path="/rubrique/" element={<Rubrique />}></Route>
                <Route path="/rubrique/creer" element={<CreateRubrique />}></Route>
                <Route path="/rubrique/alter/:idRubrique" element={<AlterRubrique />}></Route>
                <Route path="/rubrique/:idRubrique" element={<ShowRubrique />}></Route>

                <Route path="/article/" element={<Article />}></Route>
                <Route path="/article/creer" element={<CreateArticle />}></Route>
                <Route path="/article/alter/:idArticle" element={<AlterArticle />}></Route>
                <Route path="/article/:idArticle" element={<ShowArticle />}></Route>


                <Route path="/mail/" element={<Mail />}></Route>
                <Route path="/mail/success/" element={<SuccessMailSend />}></Route>
                <Route path="/account" element={<Account />}></Route>

                <Route path="/forum" element={<Forum />}></Route>
                <Route path="/statforum" element={<StatForum />}></Route>
                <Route path="/boncommandes" element={<BonCommandes />}></Route>
                <Route path="/setting" element={<Setting />}></Route>

              </>
            }

            <Route path="/*" element={<Error404Page />}></Route>
            {/* <Route path="/*" element={<Home />}></Route> */}

          </Routes>
        </div>

      </Router>
    </AppContext.Provider>
  );
}

export default App;



function CheckInternetConnection({ isOnline, setIsOnline }) {

  const checkInternet = async () => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2500);
      const response = await fetch('/favicon.ico', { signal: controller.signal });
      clearTimeout(timeout);
      setIsOnline(response.ok);
    } catch (error) {
      setIsOnline(false);
    }
  };

  useEffect(() => {
    checkInternet();
    const intervalId = setInterval(checkInternet, 10000);
    return () => clearInterval(intervalId);
  }, []);

}



const checkUserOnCookies = (user, setUser) => {
  const userCookie = Cookies.get("user");

  if (userCookie) {
    try {
      const parsedUser = JSON.parse(userCookie);
      // Comparaison plus robuste : comparer les IDs et les propriétés importantes
      // plutôt que JSON.stringify qui peut échouer à cause de l'ordre des propriétés
      
      // Si l'utilisateur du contexte n'existe pas, utiliser celui du cookie
      if (!user) {
        setUser(parsedUser);
        return;
      }
      
      // Comparer les propriétés importantes
      const userIdMatch = parsedUser.id === user.id;
      const emailMatch = parsedUser.email === user.email;
      const photoUrlMatch = parsedUser.photoUrl === user.photoUrl;
      
      // Si l'ID ou l'email ne correspondent pas, c'est un utilisateur différent
      if (!userIdMatch || !emailMatch) {
        setUser(parsedUser);
        return;
      }
      
      // Si l'ID et l'email correspondent mais que photoUrl est différent,
      // utiliser celui du cookie (qui est plus récent si on vient de l'uploader)
      if (!photoUrlMatch && parsedUser.photoUrl) {
        // Le cookie a une photoUrl mais pas le contexte, mettre à jour
        setUser(parsedUser);
        return;
      }
      
      // Si le contexte a une photoUrl mais pas le cookie, mettre à jour le cookie
      if (photoUrlMatch && user.photoUrl && !parsedUser.photoUrl) {
        Cookies.set("user", JSON.stringify(user), { expires: 7 });
        return;
      }
      
    } catch (e) {
      console.error("Erreur lors de la lecture du cookie utilisateur:", e);
    }
  } else if (user !== null) {
    // Le cookie "user" n'existe pas, mais l'argument user n'est pas null
    // Sauvegardons le cookie
    Cookies.set("user", JSON.stringify(user), { expires: 7 });
  }
}