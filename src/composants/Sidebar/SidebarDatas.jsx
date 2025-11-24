//import * as FaIcons from "react-icons/fa";
import * as AIcons from "react-icons/ai";
import * as HIcons from "react-icons/hi";
import * as FAcons from "react-icons/fa";
import * as MDicons from "react-icons/md";
import * as GIicons from "react-icons/gi";
import SchoolIcon from "@mui/icons-material/School";
import colors from "../../utils/style/colors";
import EmailIcon from "@mui/icons-material/Email";
//import colors from "../../util/style/colors";

export const SidebarDatas = [
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
      title: "Etudiant",
      path: "/",
      icon: <HIcons.HiOutlineUserGroup size={25} />,
      cName: "nav-text",
      color: colors.contact,
      subMenu: [
         {
            userLevel: 0,
            title: "Lists Etudiants",
            path: "/etudiants",
            cName: "submenu-text",
         },
         {
            userLevel: 2,
            title: "Stat. Etudiant",
            path: "/statetudiant",
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
            title: "List Forum",
            path: "/forum",
            cName: "submenu-text",
         },
         {
            userLevel: 0,
            title: "Stat forum",
            path: "/statforum",
            cName: "submenu-text",
         },
      ],
   },
   {
      order: 4,
      userLevel: 0,
      title: "Professeur",
      path: "/",
      icon: <HIcons.HiOutlineUserGroup size={25} />,
      cName: "nav-text",
      color: colors.vente,
      subMenu: [
         {
            userLevel: 0,
            title: "List Professeurs",
            path: "/professeurs",
            cName: "submenu-text",
         },
         {
            userLevel: 0,
            title: "Stat professeur",
            path: "/boncommandes",
            cName: "submenu-text",
         },
      ],
   },

   {
      order: 5,
      userLevel: 0,
      title: "Contenu de formation",
      path: "/",
      icon: <HIcons.HiOutlineUserGroup size={25} />,
      cName: "nav-text",
      color: colors.vente,
      subMenu: [
         {
            userLevel: 0,
            title: "Modules",
            path: "/modules",
            cName: "submenu-text",
         },
         {
            userLevel: 0,
            title: "Cours",
            path: "/cours",
            cName: "submenu-text",
         },
         {
            userLevel: 0,
            title: "Stat professeur",
            path: "/boncommandes",
            cName: "submenu-text",
         },
      ],
   },
   {
      order: 6,
      userLevel: 0,
      title: "Media",
      path: "/",
      icon: <HIcons.HiOutlineUserGroup size={25} />,
      cName: "nav-text",
      color: colors.vente,
      subMenu: [
         {
            userLevel: 0,
            title: "Rubriques",
            path: "/rubrique",
            cName: "submenu-text",
         },
         {
            userLevel: 0,
            title: "Articles",
            path: "/article",
            cName: "submenu-text",
         },
         {
            userLevel: 0,
            title: "Stat media",
            path: "/boncommandes",
            cName: "submenu-text",
         },
      ],
   },

   {
      order: 7,
      userLevel: 0,
      title: "Parametre",
      path: "/setting",
      icon: <HIcons.HiOutlineUserGroup size={25} />,
      cName: "nav-text",
      color: colors.vente,
   },

   {
      order: 8,
      userLevel: 0,
      title: "Mails",
      path: "/mail",
      icon: <EmailIcon fontSize="large" sx={{ color: "#fff" }} />,
      cName: "nav-text",
      color: colors.vente,
   },
];
