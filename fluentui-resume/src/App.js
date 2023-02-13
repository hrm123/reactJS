import React, { useState } from 'react';
import './App.css';
import { FluentProvider, makeStyles, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, teamsDarkTheme, teamsLightTheme, tokens } from '@fluentui/react-components';
import { Switch } from '@fluentui/react-components';
import { Card } from '@fluentui/react-components/unstable';

const useMenuListContainerStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    minWidth: '128px',
    minHeight: '48px',
    maxWidth: '300px',
    width: 'max-content',
    boxShadow: `${tokens.shadow16}`,
    paddingTop: '4px',
    paddingBottom: '4px'
  }
});


const SideNav = () => {
  const styles = useMenuListContainerStyles();
  return (
    <div className={styles.container}>
      <MenuList as={Card}>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <MenuItem>Employment</MenuItem>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>2008-2018</MenuItem>
              <MenuItem>2018-current</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <MenuItem>Education</MenuItem>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Masters</MenuItem>
              <MenuItem>Bachelors</MenuItem>
              <MenuItem>Continuing</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <MenuItem>Miscellaneous</MenuItem>
      </MenuList>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState('DarkTheme')

  function onChange(ev, checked) {
    console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
    setTheme(theme=='DarkTheme'? 'LightTheme' : 'DarkTheme')
  }
  

  

  return (
    <FluentProvider theme={theme=='DarkTheme' ? teamsDarkTheme : teamsLightTheme}>
      
    <div className="ms-Grid AppBox" style={{}}> 
    <div className="ms-Grid-row">
    {SideNav()}</div>
    <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2"></div>
        <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">Second</div>
    </div>
      <Switch label="Toggle dark" labelPosition="after" onChange={onChange}/>
    </div>
    
      
    
  </FluentProvider>
  );
}

export default App;
