import React from 'react';
import { Link } from "react-router";

export default class ListItemLink extends Link {
    render () {
      const { router } = this.context
      const { onlyActiveOnIndex, to } = this.props

      const isActive = router.isActive(to, onlyActiveOnIndex)

      return (
        <li className={isActive ? 'active' : ''}>
          <Link {...this.props} />
        </li>
      )
    }
}
