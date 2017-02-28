var localSongs = [{
	title: 'As The Deer',
	labels: ['sacred','relaxing'],
	author: 'Fake'
},{
	title: 'Change My Heart, O God',
	labels: ['sacred'],
	author: 'Fake'
},{
	title: 'Give Thanks',
	labels: ['sacred'],
	author: 'Fake'
},{
	title: 'In Moments Like These',
	labels: ['sacred'],
	author: 'Fake'
},{
	title: 'Make Me a Servant',
	labels: ['sacred'],
	author: 'Another author'
},{
	title: 'Morning Has Broken',
	labels: ['sacred'],
	author: 'Another author'
},{
	title: 'O Perfect Love',
	labels: ['sacred','love','wedding'],
	author: 'Another author'
},{
	title: 'Simple Gifts',
	labels: ['sacred'],
	author: 'Another author'
},{
	title: 'What a Friend We Have in Jesus',
	labels: ['sacred','upbeat'],
	author: 'Another author'
},{
	title: 'Wondrous Love/ Wondrous Cross',
	labels: ['sacred','relaxing'],
	author: 'Ben'
},{
	title: 'Angelus',
	labels: ['classical','relaxing'],
	author: 'Ben'
},{
	title: 'Ballade',
	labels: ['classical','relaxing'],
	author: 'Ben'
},{
	title: 'Dreams of Spring',
	labels: ['relaxing'],
	author: 'Ben'
},{
	title: 'Fountain in the Rain',
	labels: ['relaxing'],
	author: 'Ben'
},{
	title: 'Gavotte',
	labels: ['classical','relaxing'],
	author: 'Ben'
},{
	title: 'Interlude',
	labels: ['classical','relaxing'],
	author: 'Ben'
}];

var KEYS = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40
};

var QueryOption = React.createClass({
    displayName: 'QueryOption',
    
    getInitialState: function() {
        return {
            active: false
        };
    },
    
    render: function() {
        return (
            <li className={this.state.active ? 'active' : ''}>
                <a href="#" tabIndex="-1" onClick={this.props.clickHandler}>
                    <span className="qf-option-type">{this.props.label}:</span>
                    <span className="qf-option-value">{this.props.value}</span>
                </a>
            </li>
        );
    }
});

var QueryMenu = React.createClass({
    displayName: 'QueryMenu',
    
    items: [],
    
    getInitialState: function() {
        return {
            activeIndex: 0
        };
    },
    
    componentDidUpdate: function() {
        if(this.items.length > 0 && this.props.options.length > this.state.activeIndex && this.state.activeIndex >= 0) {
            this.items[this.state.activeIndex].setState({
                active: true
            });
        }
    },
    
    updateActive: function(index) {
        if(this.state.activeIndex === index) {
            return;
        }
        
        this.items[this.state.activeIndex].setState({
            active: false
        });
        
        this.items[index].setState({
            active: true
        });
        
        this.setState({
            activeIndex: index
        });
    },
    
    selectUp: function() {
        var index = this.state.activeIndex - 1;
        
        if(index < 0) {
            index = 0;
        }
        
        this.updateActive(index);
    },
    
    selectDown: function() {
        var index = this.state.activeIndex + 1;
        
        if(index > this.props.options.length - 1) {
            index = this.props.options.length - 1;
        }
        
        this.updateActive(index);
    },
    
//    initActive: function() {
//        this.items[this.state.activeIndex].setState({
//            active: true
//        });
//    },
    
    render: function() {
        return (
            <div className="dropdown-menu">
                {this.props.options.map(function(option, i) {
                    return <QueryOption
                               key={i}
                               label={option.label}
                               value={option.value}
                               clickHandler={this.props.clickHandler.bind(null, i)}
                               ref={(item) => { this.items[i] = item; }} />
                }, this)}
            </div>
        );
    }
});

var QueryParameter = React.createClass({
    displayName: 'QueryParameter',
    
    getInitialState: function() {
        return {
            highlighted: false
        };
    },
    
    removeParameterOnBackspace: function(event) {
        if(event.keyCode === KEYS.BACKSPACE) {
            event.preventDefault();

            this.props.removeParameter();
        }
    },
    
    render: function() {
        return (
            <span className={"qf-parameter btn btn-default btn-xs" + (this.state.highlighted ? " qf-parameter-highlighted" : "")}
                tabIndex="0"
                onKeyDown={this.removeParameterOnBackspace}>
                <span className="close" onClick={this.props.removeParameter}>&nbsp;x</span>
                <span className="qf-option-type">{this.props.label}: </span>
                <span className="qf-option-value">{this.props.value}</span>
            </span>
        );
    }
});

var QueryField = React.createClass({
    displayName: 'QueryField',
    
    getInitialState: function() {
        return {
            inputValue: '',
            options: this.props.options,
            filteredOptions: [],
            parameters: [],
            freeFormIndexes: [],
            menuVisible: false
        };
    },
    
    addParameter: function(parameter) {
        var params = this.state.parameters;
        params.push(parameter);
        
        this.setState({
            parameters: params
        });
        
        this.filterItems();
    },
    
    removeParameter: function(index) {
        var params = this.state.parameters;
        params.splice(index,1);
        
        this.setState({
            parameters: params
        });
    },
    
    filterItems: function() {
        var items = this.props.items,
            queryParameters = this.state.parameters,
            filtered = [],
            i, j, param, item, match;
        
        if(queryParameters.length === 0) {
          return items;
        }

        for(i = 0; i < items.length; i++) {
          item = items[i];
          match = true;

          for(j = 0; j < queryParameters.length; j++) {
                param = queryParameters[j];

                if(param.type === undefined) {
                    param.type = 'string';
                }

                switch(param.type) {
                case 'array':
                    switch(param.comparison) {
                    case 'equals':
                        if(item[param.field].indexOf(param.value.toLowerCase()) < 0) {
                            match = false;
                        }
                        break;
                    default:
                        throw new Error('"' + param.comparison + '" is not support for type "' + param.type + '".');
                    }
                    break;
                case 'string':
                    switch(param.comparison) {
                    case 'equals':
                        if(item[param.field] !== param.value) {
                            match = false;
                        }
                        break;
                    case 'contains':
                        if(item[param.field] === undefined || item[param.field] === null ||
                                !item[param.field].toLowerCase().includes(param.value.toLowerCase())) {
                            match = false;
                        }
                        break;
                    default:
                        throw new Error('"' + param.comparison + '" is not support for type "' + param.type + '".');
                    }
                    break;
                default:
                    throw new Error('Type "' + param.type + '" is not supported.');
                }
          }

          if(match) {
            filtered.push(item);
          }
        }

        this.props.filterItems(filtered);
        
//        for(i = 0; i < this.props.items.length; i++) {
//            
//        }
    },
    
    filterOptions: function(value, options) {
        var filteredOptions = [],
            lowercaseValue = value.toLowerCase(),
            option, i;
        
        for(i = 0; i < options.length; i++) {
            option = options[i];
            
            if(!this.isOptionSelected(option, this.state.parameters)) {
                if(option.freeform) {
                    option.value = value;
                    filteredOptions.push(option);
                } else if(option.value.toLowerCase().indexOf(lowercaseValue) > -1) {
                    filteredOptions.push(option);
                }
            }
        }
        
        return filteredOptions;
    },
    
    isOptionSelected: function(option) {
        var param, i;
        
        for(i = 0; i < this.state.parameters.length; i++) {
            param = this.state.parameters[i];
            
            if(option.type === 'array') {
                if(param.label === option.label &&
                  param.value === option.value) {
                    return true;
                }
            } else if(param.label === option.label) {
                return true;
            }
        }
        
        return false;
    },
    
    onInputChange: function(event) {
        // get new input value
        var newValue = event.target.value;
        
        this.inputChange(newValue);
    },
    
    inputChange: function(newValue) {
        // set menu visible or hidden
        var menuVisible = !!newValue;
        
        // filter options if menu is visible
        var filteredOptions = [];
        if(menuVisible) {
            filteredOptions = this.filterOptions(newValue, this.state.options);
        }
        
//        this.refs.menu.initActive();
        
        // update state
        this.setState({
            inputValue: newValue,
            menuVisible: menuVisible,
            filteredOptions: filteredOptions
        });
    },
    
    onKeyDown: function(event) {
        if(event.keyCode === KEYS.BACKSPACE && !this.state.inputValue) {
            var len = this.state.parameters.length;

            if(len > 0) {
                this.state.selectedIndex = len - 1;
            }
            
            console.log(this.refs);
        } else if(event.keyCode === KEYS.UP_ARROW && this.state.menuVisible) {
            event.preventDefault();
            this.refs.menu.selectUp();
        } else if(event.keyCode === KEYS.DOWN_ARROW && this.state.menuVisible) {
            event.preventDefault();
            this.refs.menu.selectDown();
        } else if(event.keyCode === KEYS.ENTER && this.state.menuVisible) {
            event.preventDefault();
            this.onSelectFilterOption(this.refs.menu.state.activeIndex);
        }
    },
    
    onSelectFilterOption: function(index) {
        var selected = this.state.filteredOptions[index];
        
        this.addParameter(selected);
        
        this.inputChange('');
    },
    
    paramDivs: [],
    
    render: function() {
        return (
            <div className="form-control qf-form-control">
                {this.state.parameters.map(function(param, i) {
                    return (
                        <QueryParameter key={i}
                            label={param.label}
                            value={param.value}
                            removeParameter={this.removeParameter.bind(this, i)}
                            ref={(param) => { this.paramDivs[i] = param; console.log(this, param, this.paramDivs, "IDENT") }} />
                    );
                }, this)}
                <div className={"dropdown" + (this.state.menuVisible ? " open" : "")}>
                    <input type="text"
                        placeholder="Enter search term..."
                        tabIndex="0"
                        className="qf-input"
                        id="qf-input1"
                        value={this.state.inputValue}
                        onChange={this.onInputChange}
                        onKeyDown={this.onKeyDown} />
                    <QueryMenu
                        options={this.state.filteredOptions}
                        clickHandler={this.onSelectFilterOption}
                        ref="menu" />
                </div>
            </div>
        );
    }
});

var labels = ['Classical', 'Relaxing', 'Sacred', 'Love', 'Wedding'];
  
var queryOptions = [{
    label: 'Title',
    field: 'title',
    value: '',
    comparison: 'contains',
    freeform: true
  },{
    label: 'Author',
    field: 'author',
    value: '',
    comparison: 'contains',
    freeform: true
  }];
  
  for(var i = 0; i < labels.length; i++) {
    queryOptions.push({
      label: 'Label',
      field: 'labels',
      type: 'array',
      value: labels[i],
      comparison: 'equals'
    });
  }

var filteredSongs = localSongs;

var filterSongs = function(songs) {
    console.log(songs);
    filteredSongs = songs;
};

ReactDOM.render(
    (
        <div>
            <QueryField options={queryOptions} items={localSongs} filterItems={filterSongs} />
            {filteredSongs.map(function(song, i) {
                return (
                    <div key={i}>
                        <div>{song.title}</div>
                        <div>{song.author}</div>
                        <div>
                            {song.labels.map(function(label, i) {
                                return <span key={i}>{label}</span>
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    ),
    document.getElementById('query-field')
);