import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../context";
//import { ServeurContext } from '../../../App';

export function useFetch(url, method, body, param, update, isMultipart) {
   const { serveurURL } = useContext(AppContext);
   //const serveur = "http://localhost:9006/elearningapi";
   //"https://api2.streenge.tech/elearningapi";
   //"https://api.streenge.tech/iri"
   // "http://localhost:9006/elearningapi";
   const [data, setData] = useState({});
   const [isLoading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   // const [send, setsend] = useState(true);
   //console.log("==Serveur Context==", serveur);

   useEffect(() => {
      if (!url) {
         setLoading(false);
         return;
      }

      const isFormDataBody = body instanceof FormData;
      const isBinaryBody = body instanceof File || body instanceof Blob || isFormDataBody;
      const isStringBody = typeof body === "string";
      // Pour les méthodes POST/PUT, ne pas faire de requête si body est null ou vide
      if (
         (method === "POST" || method === "PUT") &&
         !isBinaryBody &&
         !isStringBody &&
         (!body || (typeof body === "object" && Object.keys(body).length === 0))
      ) {
         console.warn(`Skipping ${method} request to ${url}: body is empty or null`);
         setLoading(false);
         return;
      }
      
      // Log pour debug
      if (method === 'PUT' || method === 'POST') {
         console.log(`Making ${method} request to ${url}`, body);
      }

      setLoading(true);
      setError(false);
      var myHeaders = new Headers();
      if (!isMultipart && !isFormDataBody) {
         myHeaders.append("Content-Type", isStringBody ? "text/plain; charset=UTF-8" : "application/json");
      }
      myHeaders.append("Connection", "Keep-alive");

      const username = "admin";
      const password = "passwordadmin237";
      const base64Credentials = btoa(username + ":" + password); // Encode en base64

      myHeaders.append("Authorization", "Basic " + base64Credentials);

      let formData = null;
      if (isMultipart) {
         if (isFormDataBody) {
            formData = body;
         } else {
            formData = new FormData();
            if (body instanceof File || body instanceof Blob) {
               formData.append("image", body);
            } else if (body && typeof body === "object") {
               Object.entries(body).forEach(([key, value]) => {
                  formData.append(key, value);
               });
            }
         }
      }

      const bodyPayload = isMultipart ? formData : isStringBody ? body : body ? JSON.stringify(body) : null;

      var myInit = {
         method: method ? method : "GET",
         headers: myHeaders,
         mode: "cors",
         cache: "default",
         body: bodyPayload,
      };

      var myHeadersMultipart = new Headers();
      myHeadersMultipart.append("Connection", "Keep-alive");
      myHeadersMultipart.append("Authorization", "Basic " + base64Credentials);
      var myInitMultipart = {
         method: method ? method : "GET",
         headers: myHeadersMultipart,
         mode: "cors",
         cache: "default",
         body: formData,
      };

      const allPath = serveurURL + url + (param ? param : "");

      if (isMultipart) {
         myInit = myInitMultipart;
      }

      async function fetchData() {
         try {
            const response = await fetch(allPath, myInit);
            
            // Vérifier le statut de la réponse
            if (!response.ok) {
               console.error(`HTTP Error: ${response.status} ${response.statusText} for ${method} ${allPath}`);
               const errorData = await response.json().catch(() => ({ message: `HTTP ${response.status}: ${response.statusText}` }));
               setData(errorData);
               // 406 = ElearningException (ex. login refusé) : corps ErrorAPI avec message — pas une panne serveur
               const isErrorApiBody =
                  response.status === 406 &&
                  errorData &&
                  typeof errorData.errorAPI !== "undefined" &&
                  errorData.errorAPI;
               setError(!isErrorApiBody);
               return;
            }
            
            //if (!isMultipart) {
            const data = await response.json();
            setData(data);
            if (data.timestamp && data.status) {
               console.log("==Une erreur serveur ==", data);
               setError(true);
            }
            // }
         } catch (err) {
            console.error("Fetch error:", err);
            setError(true);
         } finally {
            setLoading(false);
         }
      }
      fetchData();
   }, [url, method, body, param, update, isMultipart, serveurURL]);
   return { isLoading, data, error };
}
