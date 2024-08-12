import { Button, Dropdown, MenuProps } from "antd"
import { useGetDocsQuery } from "../store/api.redux.slice"


const HomePage = () => {
    const { data, isLoading, isError } = useGetDocsQuery()
    console.log({data})
    console.log({isLoading})
    console.log({isError})
    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              1st menu item
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              3rd menu item
            </a>
          ),
        },
      ]
  return (
    <><Dropdown menu={{ items }} placement="bottomLeft">
    <Button>bottomLeft</Button>
  </Dropdown></>
  )
}

export default HomePage