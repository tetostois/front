import { Box, Typography, Grid } from "@mui/material";
import React, { useState } from "react";
import SaveComponent from "../../../../../composants/SaveComponent";
import DescriptionIcon from "@mui/icons-material/Description";
import TranslateIcon from "@mui/icons-material/Translate";
import { FormTextInput } from "../../../../../composants/UiInputs";

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
                    background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
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
                    border: "1px solid rgba(22, 163, 74, 0.1)",
                    borderTop: "none"
                }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                            <TranslateIcon sx={{ color: "#16a34a", fontSize: 20 }} />
                            <Typography variant="body2" sx={{ fontWeight: 600, color: "#718096" }}>
                                {isFrench ? "Intitulé en Français" : "Title in French"}
                            </Typography>
                        </Box>
                        <FormTextInput
                            label={isFrench ? "Intitulé en Français" : "Title in French"}
                            placeholder={isFrench ? "Ex: Ce titre" : "Ex: This title"}
                            fullWidth
                            value={form.intitule || ""}
                            onChange={(e) => {
                                setForm({ ...form, intitule: e.target.value });
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                            <TranslateIcon sx={{ color: "#16a34a", fontSize: 20 }} />
                            <Typography variant="body2" sx={{ fontWeight: 600, color: "#718096" }}>
                                {isFrench ? "Intitulé en Anglais" : "Title in English"}
                            </Typography>
                        </Box>
                        <FormTextInput
                            label={isFrench ? "Intitulé en Anglais" : "Title in English"}
                            placeholder={isFrench ? "Ex: Ce titre" : "Ex: This title"}
                            fullWidth
                            value={form.intituleEn || ""}
                            onChange={(e) => {
                                setForm({ ...form, intituleEn: e.target.value });
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
                        <FormTextInput
                            label={isFrench ? "Description" : "Description"}
                            placeholder={isFrench ? "Description" : "Description"}
                            multiline
                            rows={4}
                            fullWidth
                            value={form.description || ""}
                            onChange={(e) => {
                                setForm({ ...form, description: e.target.value });
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
