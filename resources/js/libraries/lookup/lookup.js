import {HTTPClient} from '../httpClient/httpClient';
export class Lookup {
    _element;
    _dropdownParent;
    _placeholder;
    _isServerSide = false;
    _uri;
    _isPagination;
    _renderData;
    _data;
    _selected;
    _onChange;

    /**
     * @param {{
     *  element: string | HTMLElement;
     *  dropdownParent: string | null;
     *  placeholder: string | null;
     *  sourceData: {
     *      serverSide: {
     *          uri: string;
     *          isPagination: boolean;
     *          renderData: (response: object) => [{id: string; text: string}]
     *      };
     *      static: [{id: string; text: string}];
     *  };
     *  onChange: (value: {id: string; text: string}) => void;
     *  isAutoInit: boolean;
     * }} options 
     */
    constructor({
        element,
        dropdownParent = null,
        placeholder,
        sourceData = null,
        onChange = null,
        isAutoInit = true,
    }) {
        this.element = element;
        this.dropdownParent = dropdownParent || null;
        this.placeholder = placeholder || null;
        this.sourceData = sourceData;
        this.onChange = onChange;

        if(isAutoInit) {
            this.init();
        }
    }

    init() {
        const options = this._buildOptions();
        $(this._element).select2(options);

        if(this._data != undefined) {
            $(this._element).val(null).trigger('change');
        }

        if(this._onChange != undefined) {
            $(this._element).on("change", (e) => {
                const value = e.target && (e.target.value != null && e.target.value.trim() != '') ? 
                    {
                        id: e.target.value,
                        name: e.target.selectedOptions[0].text
                    } : null;
                this._onChange(value);
            });
        }
    }

    /**
     * @param {{ nodeType: any; }} value
     */
    set element(value) {
        if(typeof value == 'string' || (value != undefined && value.nodeType)) {
            this._element = value;
        } else {
            throw new Error('Element must be string or node element');
        }
    }

    /**
     * @param {any} value
     */
    set dropdownParent(value) {
        if(value != undefined) {
            if(typeof value != 'string') {
                throw new Error('Dropdown Parent must be string');
            }
    
            this._dropdownParent = value;
        }
    }

    /**
     * @param {any} value
     */
    set placeholder(value) {
        if(value != undefined) {
            if(typeof value != 'string') {
                throw new Error('Placeholder must be string');
            }
    
            this._placeholder = value;
        }
    }

    /**
     * @param {{ static: any; }} value
     */
    set sourceData(value) {
        if(value != undefined && typeof value == 'object') {
            if(value.serverSide != undefined && typeof value.serverSide == 'object' && value.serverSide.hasOwnProperty('uri')) {
                if(typeof value.serverSide.uri != 'string') {
                    throw new Error('Uri must be string');
                }
                
                this._uri = value.serverSide.uri;
                this._isPagination = value.serverSide.isPagination != undefined ? value.serverSide.isPagination : false;
                this._renderData = value.serverSide.renderData || null;

                this._isServerSide = true;
            } else if(value.static != undefined && typeof value.static == 'object') {
                this._data = value.static;
            } else {
                throw new Error('Source Data must have property Server Side or Static');
            }
        }
    }

    /**
     * @param {any} value
     */
    set onChange(value) {
        if(value != undefined) {
            if(typeof value != 'function') {
                throw new Error('onChange must be function');
            }
    
            this._onChange = value;
        }
    }

    /**
     * setValue
     * @param {object | string} value 
     */
    setValue(value) {
        try {
            if(value == null) {
                $(this._element).val(null).trigger('change');
            } else {
                const id = typeof value == 'string' ? value : (
                    typeof value == 'object' && value != undefined && (value.hasOwnProperty('id') && value.hasOwnProperty('name')) ?
                        value.id : null
                );
                if(!this._isServerSide) {
                    if(id == null) {
                        throw new Error('Value is not valid');
                    }
                    $(this._element).val(id).trigger('change');
                } else {
                    const name = typeof value == 'object' && value != undefined && (value.hasOwnProperty('id') && value.hasOwnProperty('name')) ?
                        value.name : null;
                    if(name == null) {
                        throw new Error('Value is not valid');
                    }
                    const selectLookup = $(this._element);
                    // const req = await HTTPClient.Request({
                    //     uri: `${APP_URL}/${this._uri}/${id}`,
                    //     method: HTTPClient.GET
                    // });
                    const option = new Option(name, id, true, true);
                    selectLookup.append(option).trigger('change');

                    selectLookup.trigger({
                        type: 'select2:select',
                        params: {
                            data: {
                                id: id,
                                name: name
                            }
                        }
                    });
                }
            }   
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getValue() {
        const value = $(this._element).select2('data');
        return value.length > 0 ? {
            id: value[0].id,
            name: value[0].text
        } : null;
    }

    _buildOptions() {
        const options = {};

        if(this._dropdownParent != undefined) {
            options.dropdownParent = $(this._dropdownParent);
        }

        if(this._placeholder != undefined) {
            options.placeholder = this._placeholder;
        }

        if(this._uri == undefined) {
            if(this._data != undefined) {
                options.data = this._data;
            }
        } else {
            options.ajax = {
                url: `${APP_URL}/${this._uri}`,
                dataType: 'json',
                delay: 700,
                data: (params) => {
                    const query = {
                        search: params.term
                    };
                    if(this._isPagination != undefined && this._isPagination) {
                        query.page = params.page || 1
                    }
                
                    return query;
                },
                processResults: (data) => {
                    let result;
                    if(this._isPagination) {
                        result = {
                            results: data.data.map(item => {
                                return this._renderData == undefined ? {
                                    id: item.id,
                                    text: item.name
                                } :
                                this._renderData(item);
                            }),
                            pagination: {
                                more: data.next_page_url != undefined ? true : false
                            }
                        };   
                    } else {
                        result = {
                            results: data.map(item => {
                                return this._renderData == undefined ? {
                                    id: item.id,
                                    text: item.name
                                } :
                                this._renderData(item);
                            })
                        };
                    }
                    
                    return result;
                },
                cache: true
            };
        }

        options.allowClear = true;
        // options.theme = 'bootstrap4';

        return options;
    }
}