import * as AIcons from "react-icons/ai";
import * as HIcons from "react-icons/hi";
import SchoolIcon from "@mui/icons-material/School";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PersonIcon from "@mui/icons-material/Person";
import colors from "../../utils/style/colors";

export const ProfesseurSidebarDatas = [
   {
      order: 1,
      userLevel: 0,
      title: "Tableau de bord",
      path: "/dashboard",
      icon: <AIcons.AiOutlineDashboard size={25} />,
      cName: "nav-text",
      color: colors.dashbaord,
   },
   {
      order: 2,
      userLevel: 0,
      title: "Etudiants",
      path: "/",
      icon: <HIcons.HiOutlineUserGroup size={25} />,
      cName: "nav-text",
      color: colors.contact,
      subMenu: [
         {
            userLevel: 0,
            title: "Liste des étudiants",
            path: "/etudiants",
            cName: "submenu-text",
         },
      ],
   },
   {
      order: 3,
      userLevel: 0,
      title: "Forum",
      path: "/",
      icon: <SchoolIcon fontSize="large" sx={{ color: "#fff" }} />,
      cName: "nav-text",
      color: colors.produits,
      subMenu: [
         {
            userLevel: 0,
            title: "Liste des messages",
            path: "/forum",
            cName: "submenu-text",
         },
         {
            userLevel: 0,
            title: "Statistiques forum",
            path: "/statforum",
            cName: "submenu-text",
         },
      ],
   },
   {
      order: 4,
      userLevel: 0,
      title: "Questions ouvertes (QRO)",
      path: "/dashboard",
      icon: <QuestionAnswerIcon sx={{ color: "#fff", fontSize: 28 }} />,
      cName: "nav-text",
      color: colors.vente,
   },
   {
      order: 5,
      userLevel: 0,
      title: "Paramètres",
      path: "/account",
      icon: <PersonIcon sx={{ color: "#fff", fontSize: 28 }} />,
      cName: "nav-text",
      color: colors.contact,
   },
];
