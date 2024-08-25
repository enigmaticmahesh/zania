import { Spin } from 'antd';
import { useGetDocsQuery } from '../store/api.redux.slice';
import DocsList from '../components/docs-list/docs-list.component';
import DocOverlay from '../components/doc-overlay/doc-overlay.component';

const HomePage = () => {
  const { data, isLoading } = useGetDocsQuery();

  if (isLoading) {
    return <Spin tip="Loading" fullscreen></Spin>;
  }

  const docsList = data && data.docs && data.docs.length > 0 && (
    <DocsList docs={data.docs} />
  );
  const docOverlay = <DocOverlay />;
  return (
    <>
      {docOverlay}
      {docsList}
    </>
  );
};

export default HomePage;
