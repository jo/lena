SOURCE = app.json.erb
TARGET = app.json
DEPENDFILE = .dependencies

# install
install : $(TARGET)
	./push $(TARGET) $(URL)


# build
$(TARGET) : $(SOURCE)
	./build $(SOURCE) > $(TARGET)


# create dependency
dep: 
	echo '$(TARGET) :' `./build $(SOURCE) --deps` > $(DEPENDFILE)


# create database
create :
	curl -XPUT $(URL)

push-data :
	./data/build data/docs.json > data/data.json
	./push data/data.json $(URL)

# clean build files
clean : 
	rm -rf $(DEPENDFILE)
	rm -rf $(TARGET)


-include $(DEPENDFILE)
