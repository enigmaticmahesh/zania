import { Card, Spin } from 'antd';
import { useGetDocsQuery } from '../store/api.redux.slice';
const { Meta } = Card;

const HomePage = () => {
  const { data, isLoading, isError } = useGetDocsQuery();
  console.log({ data });
  console.log({ isLoading });
  console.log({ isError });

  const docsList = data?.docs.map((doc) => {
    const img = <img alt="example" src={doc.thumbnail} />;
    return (
      <Card key={doc.id} hoverable style={{ width: 240 }} cover={img}>
        <Meta title={doc.title} />
      </Card>
    );
  });

  if (isLoading) {
    return <Spin tip="Loading" fullscreen></Spin>;
  }

  return (
    <>
      <div className="docs_container">{docsList}</div>
    </>
  );
};

export default HomePage;
