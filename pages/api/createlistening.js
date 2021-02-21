import axios from 'axios'
const apiURL = `${process.env.NEXT_PUBLIC_API_URL}`;

async function getAlbum(discogsId, token) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const res = await axios.get(`${apiURL}/albums?discogsId=`+discogsId,config);
    return res;
}

async function saveListening(date, discogsId, score, token) {
    // Get discogs albums informations
    const album = await axios.get(`https://api.discogs.com/masters/`+discogsId);
    
    // Create album in discodiary
    const titleAlbum = album.data.title
    const yearAlbum = album.data.year
    const artistAlbum = album.data.artists[0].name
    const payloadAlbum = {"artist":artistAlbum, "title": titleAlbum, "year": yearAlbum, "discogsId" : discogsId}
    
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    // Get album in discodiary
    const albumInit = await getAlbum(discogsId, token);

    // Save album into the database
    if (albumInit.data.length === 0) {
        try {
            await axios.post(`${apiURL}/albums`, payloadAlbum, config);      
        } catch (error) {
            console.log('error save album');
        }      
    }

    // Get album in discodiary
    const albumDiscodiary = await getAlbum(discogsId, token);

    // Add listening
    const albumId = albumDiscodiary.data[0]._id
    const payloadListening = {'date': date , 'score': score, 'album' : albumId}
    const { data: payloadResult } = await axios.post(`${apiURL}/listenings`, payloadListening, config)
 
    return payloadResult;
}

export default function handler(req, res) {
    const result = saveListening(req.body.date, req.body.discogsId, req.body.score, req.body.token);
    res.status(200).json(result);
}