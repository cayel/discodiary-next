import Link from "next/link";
import DataTable from 'react-data-table-component';

function getTitle (year) {
  if (year == 0) {
    return 'Best Ever !';
  } else {
    return 'Top '+year;
  }
}

function getTitleLink (title, linkTop, size) {
  if (size === 0) {
    return <Link href={linkTop}><a>{title}</a></Link>;
  } else {
    {title}
  }
}

function getColumns() {
  return ([
    {
      name: 'Rank',
      selector: 'position',
      sortable: false,
    },
    {
      name: 'Artist',
      selector: 'artist',
      sortable: true,
    },
    {
      name: 'Title',
      selector: 'title',
      sortable: true
    },
    {
      name: 'Score',
      selector: 'score',
      sortable: true
    },
    {
      name: 'Listenings',
      selector: 'listened',
      sortable: true
    }
  ]);
}

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
    album.listened = album.listenings.length;
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
  const columns = getColumns();
  const title = getTitle(year);
  var titleLink = title;
  var datatable = <DataTable title={titleLink} columns={columns} data={list} defaultSortField="position" pagination dense />;

  if (size != 0) {
    titleLink = <Link href={linkTop}><a>{title}</a></Link>
    datatable = <DataTable title={titleLink} columns={columns} data={list} defaultSortField="position" dense />
  } 
  
  return (
    <div class="w-full md:w-1/2 xl:w-1/2 p-6">
      <div class="border-b p-3">
        {datatable}
      </div>
    </div>
  );
};

export default AlbumRanking;
