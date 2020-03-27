import React from 'react';
import PropTypes from 'prop-types'
import '../styles/Header.css';
import { Link } from 'react-router-dom';
// import { splitFullname } from '../Helper/Helpers';

class CitizenItem extends React.Component {

  constructor(props){
    super(props);

  }

  render() {

    let citizenData = this.props.data.map(function (data, index) {
        return (
          <article className="ReviewItem__root" key={index}>
            <div className="ReviewItem-header">
              <div>

              </div>
              <div>
                <div>
                <img src={data.avatar.normal.url} alt="new" />
                </div>
                <div>
                  Persona: {data.name}
                </div>
              </div>
            </div>

            <div className="ReviewItem__body">
              infraction: {data.infraction}
            </div>
            <div className="ReviewItem__body">
              dni: {data.dni}
            </div>



          </article>

        )
      }, this);

      return (
        <div>
          {citizenData}
        </div>
      );
  }
}

export default CitizenItem;
