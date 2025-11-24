import React from "react";
import "./sceletonCSS.css";
import { CircularProgress } from "@mui/material";

export const SceletonDiv = ({
   width,
   height,
   marginBottom,
   haveCircularProgress,
   circularProgressSize,
   texte,
   borderRadius,
}) => {
   return (
      <div
         style={{
            width: width ? width : "100%",
            height: height ? height : 17,
            marginBottom: marginBottom ? marginBottom : 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            borderRadius: borderRadius ? borderRadius : 0,
            // paddingLeft: "40%",
         }}
         className="sceletonDiv"
      >
         {haveCircularProgress && <CircularProgress size={circularProgressSize ? circularProgressSize : 10} />}
         {texte && <span>{texte}</span>}
      </div>
   );
};

export const SceletonBigArticle = () => {
   return (
      <div
         style={{
            width: "100%",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
         }}
      >
         <article className="corpsArticle" style={{}}>
            <SceletonDiv name="titre" height={"25px"} />
            <SceletonDiv width={"60%"} height={"25px"} marginBottom={"30px"} />

            <SceletonDiv name="chapaeu/sousTitre" />
            <SceletonDiv />
            <SceletonDiv width={"30%"} marginBottom={"15px"} />

            <SceletonDiv name="dataPubication" width={"30%"} height={"13px"} />
            <SceletonDiv
               name="imageArticle"
               texte="chargement..."
               width={"100%"}
               height={"400px"}
               haveCircularProgress={true}
               circularProgressSize={50}
            />
            <SceletonDiv name="titreImage" width={"70%"} height={"13px"} marginBottom={"30px"} />

            <SceletonDiv />
            <SceletonDiv />
            <SceletonDiv marginBottom={"10px"} />

            <SceletonDiv />
            <SceletonDiv />
            <SceletonDiv width={"50%"} marginBottom={"15px"} />
         </article>
      </div>
   );
};

export const SceletonSmallArticleHorizontal = () => {
   return (
      <div className="mediablocArticle">
         <div name="nomArticle" className="mediablocArticleImanage">
            <SceletonDiv
               name="imageArticle"
               texte="chargement..."
               width={"100%"}
               height={"100%"}
               haveCircularProgress={true}
               circularProgressSize={20}
            />
         </div>
         <div name="titreArticle" className="mediablocArticleTitreDiv">
            <SceletonDiv marginBottom={"5px"} />
            <SceletonDiv width={"50%"} marginBottom={"15px"} />
         </div>

         <div name="datePublication" className="mediablocArticleDateDiv01">
            <SceletonDiv height={"13px"} marginBottom={"0px"} />
         </div>
      </div>
   );
};

export const SceletonProfilEtudiant = () => {
   return (
      <div className="mediablocArticle">
         <div name="nomArticle" className="mediablocArticleImanage">
            <SceletonDiv
               name="imageArticle"
               texte="chargement..."
               width={"100%"}
               height={"100%"}
               haveCircularProgress={true}
               circularProgressSize={20}
            />
         </div>
         <div name="titreArticle" className="mediablocArticleTitreDiv">
            <SceletonDiv marginBottom={"5px"} />
            <SceletonDiv width={"50%"} marginBottom={"15px"} />
         </div>

         <div name="datePublication" className="mediablocArticleDateDiv01">
            <SceletonDiv height={"13px"} marginBottom={"0px"} />
         </div>
      </div>
   );
};
