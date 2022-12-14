import React, { Component } from 'react';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: '',
      type: 'User',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { fname, lname, email, password, type } = this.state;
    fetch('http://localhost:5001/register', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        fname,
        email,
        lname,
        password,
        type,
      }),
    })
      .then((res) => {
        if (res.status === 400) {
          res.json().then((data) => alert(data.message));
          return;
        }
        return res.json();
      })
      .then((data) => {
        console.log(data, 'Sign Up');
        if (data.status === 'OK') {
          alert('Sign up successful');
          window.localStorage.clear();
          window.localStorage.setItem('token', data.token);
          window.localStorage.setItem('user', JSON.stringify(data.user));
          window.location.href = '/';
        }
      });
  }
  render() {
    return (
      <div className=" mt-20 felx flex-col mb-3 justify-center items-center mx-[20%]">
        <form onSubmit={this.handleSubmit}>
          <h2 className="mt-5 text-3xl font-bold text-[#4476e2]">
            {' '}
            Create an account
          </h2>
          <p className="text-[#89acf6] mb-10">
            Complete the sign up process to get started
          </p>

          <div className="mb-3">
            <label
              htmlFor="fname"
              className="block mb-2 text-sm font-medium text-gray-300 dark:text-white"
            >
              First Name
            </label>
            <input
              type="text"
              id="fname"
              autoComplete="off"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => this.setState({ fname: e.target.value })}
              placeholder="First name"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="lname"
              className="block mb-2 text-sm font-medium text-gray-300 dark:text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lname"
              autoComplete="off"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              required
              onChange={(e) => this.setState({ lname: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-300 dark:text-white"
            >
              Email address
            </label>
            <input
              type="text"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => this.setState({ email: e.target.value })}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-300 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              required
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <div className="flex items-start mt-3">
              <div className="flex items-center h-5">
                <input
                  id="administrator"
                  type="checkbox"
                  checked={this.state.checked}
                  value="Administrator"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  onChange={(e) => {
                    e.target.checked
                      ? this.setState({ type: 'Administrator' })
                      : this.setState({ type: 'User' });
                  }}
                />
              </div>
              <label
                htmlFor="administrator"
                className="ml-2 text-sm font-medium text-gray-300 dark:text-gray-300"
              >
                Administrator
              </label>
            </div>
          </div>
          <div className="mt-20">
            <div className="flex items-start mb-3">
              <button
                type="submit"
                className="text-white bg-[#0443ca] hover:bg-[#4476e2] focus:ring-4 focus:outline-none font-bold rounded-lg w-full px-5 py-2.5 text-center "
              >
                Sign Up
              </button>
            </div>
            <div className="mt-2 flex flex-row justify-center">
              <p className="block mb-2 mr-2 text-sm font-medium text-gray-300 dark:text-white">
                Already have an account?
              </p>

              <a
                href="/login"
                className="block mb-2 text-sm font-bold text-[#5d8cf1] dark:text-white hover:cursor pointer"
              >
                Log in
              </a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
