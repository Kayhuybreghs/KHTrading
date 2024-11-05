import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public')); // Serve static files from the 'public' directory

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});