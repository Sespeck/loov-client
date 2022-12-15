export const updateFavoriteSongs = async ({ songList }) => {
  fetch('/update-songs', {
    method: 'POST',
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      token: window.localStorage.getItem('token'),
      songList,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, 'favorite songs update');
      if (data.status === 'OK') {
        window.localStorage.removeItem('user');
        window.localStorage.setItem('user', JSON.stringify(data.user));
        return (
          <div className="fixed top-0"> Favorite songs update successful</div>
        );
      }
    });
};

export const updateFavoriteArtists = async ({ artistList }) => {
  fetch('/update-artists', {
    method: 'POST',
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      token: window.localStorage.getItem('token'),
      artistList,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, 'favorite artists update');
      if (data.status === 'OK') {
        window.localStorage.removeItem('user');
        window.localStorage.setItem('user', JSON.stringify(data.user));
      }
    });
};
