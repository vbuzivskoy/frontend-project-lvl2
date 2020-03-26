# frontend-project-lvl2
[![Maintainability](https://api.codeclimate.com/v1/badges/2be91a158473133e146d/maintainability)](https://codeclimate.com/github/vbuzivskoy/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2be91a158473133e146d/test_coverage)](https://codeclimate.com/github/vbuzivskoy/frontend-project-lvl2/test_coverage)
![Node CI](https://github.com/vbuzivskoy/frontend-project-lvl2/workflows/Node%20CI/badge.svg)

## genDiff

gendiff is a cli utility that genegetes difference of two configuration files.\
The utility supports JSON, YAML and INI input file formats.

Usage:
```
gendiff [options] <firstConfig> <secondConfig>
```

Options:\
  ```-V```, ```--version```        output the version number\
  ```-f```, ```--format [type]```  output format (default: "complex")\
  ```-h```, ```--help```           output usage information

The utility supports next output formats:
- complex;
- plain;
- json.

### How to use gendiff with different config file formats

[![asciicast](https://asciinema.org/a/gYhh1Q73xE0CtD2bS5NDM5hKe.svg)](https://asciinema.org/a/gYhh1Q73xE0CtD2bS5NDM5hKe)

### How to use gendiff with different output formats

[![asciicast](https://asciinema.org/a/oAn1F1DmgVwdwHUcmkNU9AOnY.svg)](https://asciinema.org/a/oAn1F1DmgVwdwHUcmkNU9AOnY)