import { TextField, Box, Typography, Grid } from "@mui/material";
import React, { useState } from "react";
import SaveComponent from "../../../../../composants/SaveComponent";
import DescriptionIcon from "@mui/icons-material/Description";
import TranslateIcon from "@mui/icons-material/Translate";

export default function FormQCM({
    initialForm,
    setErrorServeur,
    setError,
    setSave,
    save,
    requestMethode,
    isFrench = true
}) {
    const [form, setForm] = useState(initialForm ? initialForm : {});
    const requestURL = "/admin/qcm/";

    return (
        <Box sx={{ p: 3 }}>
            <Box
                sx={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    p: 2,
                    borderRadius: "20px 20px 0 0",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 0
                }}
            >
                <DescriptionIcon sx={{ color: "#fff", fontSize: 28 }} />
                <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>
                    {isFrench ? "Informations du QCM" : "QCM Information"}
                </Typography>
            </Box>
            <Box
                sx={{
                    backgroundColor: "white",
                    borderRadius: "0 0 20px 20px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    p: 4,
                    border: "1px solid rgba(102, 126, 234, 0.1)",
                    borderTop: "none"
                }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                            <TranslateIcon sx={{ color: "#667eea", fontSize: 20 }} />
                            <Typography variant="body2" sx={{ fontWeight: 600, color: "#718096" }}>
                                {isFrench ? "Intitulé en Français" : "Title in French"}
                            </Typography>
                        </Box>
                        <TextField
                            label={isFrench ? "Intitulé en Français" : "Title in French"}
                            placeholder={isFrench ? "Ex: Ce titre" : "Ex: This title"}
                            fullWidth
                            value={form.intitule || ""}
                            onChange={(e) => {
                                setForm({ ...form, intitule: e.target.value });
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                    "& fieldset": {
                                        borderColor: "rgba(102, 126, 234, 0.2)"
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "rgba(102, 126, 234, 0.4)"
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#667eea"
                                    },
                                    "& input": {
                                        color: "#1a202c",
                                        fontFamily: "'Inter', sans-serif"
                                    }
                                },
                                "& .MuiInputLabel-root": {
                                    color: "#718096",
                                    fontFamily: "'Inter', sans-serif"
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: "#667eea"
                                }
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                            <TranslateIcon sx={{ color: "#43e97b", fontSize: 20 }} />
                            <Typography variant="body2" sx={{ fontWeight: 600, color: "#718096" }}>
                                {isFrench ? "Intitulé en Anglais" : "Title in English"}
                            </Typography>
                        </Box>
                        <TextField
                            label={isFrench ? "Intitulé en Anglais" : "Title in English"}
                            placeholder={isFrench ? "Ex: Ce titre" : "Ex: This title"}
                            fullWidth
                            value={form.intituleEn || ""}
                            onChange={(e) => {
                                setForm({ ...form, intituleEn: e.target.value });
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                    "& fieldset": {
                                        borderColor: "rgba(67, 233, 123, 0.2)"
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "rgba(67, 233, 123, 0.4)"
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#43e97b"
                                    },
                                    "& input": {
                                        color: "#1a202c",
                                        fontFamily: "'Inter', sans-serif"
                                    }
                                },
                                "& .MuiInputLabel-root": {
                                    color: "#718096",
                                    fontFamily: "'Inter', sans-serif"
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: "#43e97b"
                                }
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                            <DescriptionIcon sx={{ color: "#fa709a", fontSize: 20 }} />
                            <Typography variant="body2" sx={{ fontWeight: 600, color: "#718096" }}>
                                {isFrench ? "Description" : "Description"}
                            </Typography>
                        </Box>
                        <TextField
                            label={isFrench ? "Description" : "Description"}
                            placeholder={isFrench ? "Description" : "Description"}
                            multiline
                            rows={4}
                            fullWidth
                            value={form.description || ""}
                            onChange={(e) => {
                                setForm({ ...form, description: e.target.value });
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                    "& fieldset": {
                                        borderColor: "rgba(250, 112, 154, 0.2)"
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "rgba(250, 112, 154, 0.4)"
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#fa709a"
                                    },
                                    "& textarea": {
                                        color: "#1a202c",
                                        fontFamily: "'Inter', sans-serif"
                                    }
                                },
                                "& .MuiInputLabel-root": {
                                    color: "#718096",
                                    fontFamily: "'Inter', sans-serif"
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: "#fa709a"
                                }
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>

            {save && (
                <SaveComponent
                    setSave={setSave}
                    requestURL={requestURL}
                    requestBody={form}
                    requestMethode={requestMethode ? requestMethode : "POST"}
                    requestParam={null}
                    setErrorServeur={setErrorServeur}
                    setError={setError}
                    redirected={true}
                />
            )}
        </Box>
    );
}
