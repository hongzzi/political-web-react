import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import UserIcon from '@material-ui/icons/AccountCircle';
import BoardIcon from '@material-ui/icons/BorderColor';
import FaceIcon from '@material-ui/icons/Face';
import SearchIcon from '@material-ui/icons/FindInPage';
import GroupIcon from '@material-ui/icons/Group';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { title } = props;
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem button key={'마이페이지'}>
          <ListItemIcon>
            <UserIcon />
            <ListItemText primary={'마이페이지'} style={{marginTop:0, marginLeft:15}} />
          </ListItemIcon>
        </ListItem>
        <ListItem button key={'자유게시판'}>
          <ListItemIcon>
            <BoardIcon />
            <ListItemText primary={'자유게시판'} style={{marginTop:0, marginLeft:15}} />
          </ListItemIcon>
        </ListItem>
      </List>
      <Divider />
      <List>
      <ListItem button key={'우리동네 후보자 살펴보기'}>
          <ListItemIcon>
            <FaceIcon />
            <ListItemText primary={'우리동네 후보자 살펴보기'} style={{marginTop:0, marginLeft:15}} />
          </ListItemIcon>
        </ListItem>
        <ListItem button key={'국회의원 찾기'}>
          <ListItemIcon>
            <SearchIcon />
            <ListItemText primary={'국회의원 찾기'} style={{marginTop:0, marginLeft:15}} />
          </ListItemIcon>
        </ListItem>
        <ListItem button key={'나와 잘맞는 정치인 찾기'}>
          <ListItemIcon>
            <GroupIcon />
            <ListItemText primary={'나와 잘맞는 정치인 찾기'} style={{marginTop:0, marginLeft:15}} />
          </ListItemIcon>
        </ListItem>
        <ListItem button key={'나의 정치성향 테스트'}>
          <ListItemIcon>
            <CheckIcon />
            <ListItemText primary={'나의 정치성향 테스트'} style={{marginTop:0, marginLeft:15}} />
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );

  const [email, setEmail] = useState(window.sessionStorage.getItem("email"));
  const logout = (evt) => {
    evt.preventDefault();
    alert(`로그아웃 되었습니다`);
    window.sessionStorage.removeItem("email");
    setEmail(null);
  }

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
      <div>
      <Button onClick={toggleDrawer('left', true)}><MenuIcon/></Button>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
          <Button variant="outlined" size="small" style={{ margin: 15 }}>
            실시간 채팅 참여하기
          </Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          <Link to="/">
          {title}
          </Link>
        </Typography>
        {
          email === null ?
            <div>
              <Link to="/SignIn">
                <Button variant="outlined" size="small" style={{ margin: 15 }}>
                  로그인
                </Button>
              </Link>
              <Link to="/SignUp">
                <Button variant="outlined" size="small">
                  회원가입
        </Button>
              </Link>
            </div>
            : <div>{window.sessionStorage.getItem("email")} 님 안녕하세요 !
            <Button variant="outlined" size="small" onClick={logout} style={{ margin: 15 }}>
                로그아웃
            </Button></div>}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};