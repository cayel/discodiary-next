import Link from "next/link";
import DataTable from 'react-data-table-component';

function getTitle (year) {
  if (year == 0) {
    return 'Best Ever !';
  } else {
    return 'Top '+year;
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
      selector: 'avgScore',
      sortable: true
    },
    {
      name: 'Listenings',
      selector: 'numOfListenings',
      sortable: true
    }
  ]);
}

function orderAlbums(albums, size) {
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
  const list = orderAlbums(listenings.albums, size);
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
