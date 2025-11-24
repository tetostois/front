import Cookies from "js-cookie";

export function removeUserCookie() {
    Cookies.remove("user");
}


export const getStatutColor=(statut)=>{
    let color='orange';
    switch (statut) {
        case "EN_ATTENTE":
            color='orange';
            break;
        case "PUBLIER":
            color='green';
            break;
        case "SUSPENDU": 
            color='red';
            break;
        default:
            color='blue';
            break;
    }

    return color;
}


export const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
        .then(() => {
            // Success message or action
            console.log('Text copied to clipboard');
        })
        .catch(err => {
            // Error handling
            console.error('Failed to copy text: ', err);
        });
};

export const getFullUrlWithSuffix = (suffix) => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    return `${url.protocol}//${url.host}${suffix}`;
};




export const calculateTimeLeft = () => {
    const targetDate = new Date('2024-09-02T00:00:00'); // Date de début de la formation
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
        heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        secondes: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };