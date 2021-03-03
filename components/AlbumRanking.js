import Link from "next/link";

function orderAlbums(albums, size) {
  for (var i = 0, len = albums.length; i < len; i++) {
    var album = albums[i];
    album.score = 0;
    album.value = 0;
    for (let i = 0; i < album.listenings.length; i++) {
      album.score = album.score + album.listenings[i].score;
    }
    album.score = album.score / album.listenings.length;
    album.value = album.score + 0.01 * album.listenings.length;
  }

  if (albums.length > 0 ) {
    albums.sort(function (a, b) {
      return b.value - a.value;
    });  
  }

  var position = 1;
  for (var i = 0, len = albums.length; i < len; i++) {
    var album = albums[i];
    album.position = position++;
  };

  if (size == 0) {
    return albums;
  } else {
    if (albums.length > 0 ) {
      return albums.slice(0, size);
    } else return [];
  }
}

const AlbumRanking = ({ listenings, size, year }) => {
  const list = orderAlbums(listenings, size);
  const linkTop = '/albums-list?year='+year;
  
  var title = '';
  if (year == 0) {
    title = 'Best Ever !';
  } else {
    title = 'Top '+year;
  }

  return (
    <div class="w-full md:w-1/2 xl:w-1/2 p-6">
      <div class="border-b p-3">
        <h5 class="font-bold text-black">
          {size>0 &&
          <Link href={linkTop}>
            <a>{title}</a>
          </Link>
          }
          {size==0 &&
            <a>{title}</a>
          }
        </h5>
      </div>
      <div class="p-5">
        <table class="w-full p-5 text-gray-700 table-auto ">
          <thead>
            <tr>
              <th class="text-left text-blue-900">Rank</th>
              <th class="text-left text-blue-900">Artist</th>
              <th class="text-left text-blue-900">Title</th>
              <th class="text-left text-blue-900">Score</th>
              <th class="text-left text-blue-900">Listenings</th>
            </tr>
          </thead>
          <tbody>
            {list.map((album) => (
              <tr key={album._id}>
                <td>{album.position}</td>
                <td>{album.artist}</td>
                <td>{album.title}</td>
                <td class="text-center">{album.score}</td>
                <td class="text-center">{album.listenings.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlbumRanking;
