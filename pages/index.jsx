import {useEffect} from 'react';
import initMiro from '../initMiro';
import Prompt from './components/Prompt';


export const getServerSideProps = async function getServerSideProps({req}) {
  const {miro} = initMiro(req);

  // redirect to auth url if user has not authorized the app
  if (!(await miro.isAuthorized(''))) {
    return {
      props: {
        boards: [],
        authUrl: miro.getAuthUrl(),
      },
    };
  }

  const api = miro.as('');

  const boards = [];

  for await (const board of api.getAllBoards()) {
    boards.push(board.name || '');
  }

  return {
    props: {
      boards,
    },
  };
};

export default function Main({boards, authUrl}) {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('panel')) return;

    window.miro.board.ui.on('icon:click', async () => {
      window.miro.board.ui.openPanel({
        url: `/?panel=1`,
      });
    });
  }, []);

  if (authUrl) {
    return (
      <div className="grid wrapper">
        <div className="cs1 ce12">
          <a className="button button-primary" href={authUrl}>
            Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid wrapper">
    <div className="cs1 ce12">
      <Prompt />
    </div>
  </div>
  );
}
