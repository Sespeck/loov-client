export const updateProfile = async ({ fname, lname, avatarFile }) => {
  fetch('/update-profile', {
    method: 'POST',
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      token: window.localStorage.getItem('token'),
      fname,
      lname,
      avatarFile,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, 'user profile update');
      if (data.status === 'OK') {
        alert('User profile update successful');
        window.localStorage.removeItem('user');
        window.localStorage.setItem('user', JSON.stringify(data.user));
      }
    });
};

export const updateRecentlyPlayed = async ({ recentlyPlayed }) => {
  fetch('/update-recently-played', {
    method: 'POST',
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      token: window.localStorage.getItem('token'),
      recentlyPlayed,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, 'recently played update');
      if (data.status === 'OK') {
        window.localStorage.removeItem('user');
        window.localStorage.setItem('user', JSON.stringify(data.user));
      }
    });
};

export const updatePlaylists = async ({ playlists }) => {
  fetch('/update-playlists', {
    method: 'POST',
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      token: window.localStorage.getItem('token'),
      playlists,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, 'playlists update');
      if (data.status === 'OK') {
        window.localStorage.removeItem('user');
        window.localStorage.setItem('user', JSON.stringify(data.user));
      }
    });
};

export const getAllUsers = async () => {
  return fetch('/get-users', {
    method: 'POST',
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      token: window.localStorage.getItem('token'),
    }),
  }).then((res) => res.json());
};

export const deleteUser = async ({ userId }) => {
  return fetch('/delete-user', {
    method: 'POST',
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      token: window.localStorage.getItem('token'),
      userId,
    }),
  }).then((res) => res.json());
};

export const editUser = async ({
  userId,
  fname,
  lname,
  avatarFile,
  userType,
}) => {
  return fetch('/edit-user', {
    method: 'POST',
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      token: window.localStorage.getItem('token'),
      userId,
      fname,
      lname,
      avatarFile,
      userType,
    }),
  }).then((res) => res.json());
};
