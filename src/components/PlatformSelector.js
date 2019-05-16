import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

//Redux:
import { selectDeparture, selectDestination } from '../actions';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class PlatformSelector extends React.Component {
  state = {
    station: '',
  };

  handleChange = name => event => {
    const selection = { [name]: event.target.value }
    if (this.props.stationType === 'departure') {
      this.props.selectDeparture({...selection})
    } else if (this.props.stationType === 'destination') {
      this.props.selectDestination({...selection})
    } else {
      console.log('define PlatformSelector prop "stationType" as "destination" or "departure".')
    }
    this.setState(selection);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor={this.props.forLabel}>{this.props.visibleLabel}</InputLabel>
          <NativeSelect
            value={this.state.station}
            onChange={this.handleChange('station')}
            inputProps={{
              name: `${this.props.forLabel}`,
              id: `${this.props.forLabel}`,
            }}>
            <option value="" />
            <option value={'10'}>Ten</option>
            <option value={'20'}>Twenty</option>
            <option value={'30'}>Thirty</option>
          </NativeSelect>
        </FormControl>
      </div>
    );
  }
}

PlatformSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, { selectDeparture, selectDestination })(withStyles(styles)(PlatformSelector));
